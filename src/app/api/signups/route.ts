import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/waitlist_signups?select=zip_code,latitude,longitude,city,state,country&latitude=not.is.null`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error("Supabase fetch error:", await res.text());
      return NextResponse.json({ error: "Failed to fetch signups" }, { status: 500 });
    }

    const rows: {
      zip_code: string;
      latitude: number;
      longitude: number;
      city: string | null;
      state: string | null;
      country: string | null;
    }[] = await res.json();

    // Aggregate by zip code — only return location data, no PII
    const byZip = new Map<string, {
      zip: string;
      lat: number;
      lng: number;
      place: string;
      state: string;
      country: string;
      count: number;
    }>();

    for (const row of rows) {
      const existing = byZip.get(row.zip_code);
      if (existing) {
        existing.count++;
      } else {
        byZip.set(row.zip_code, {
          zip: row.zip_code,
          lat: row.latitude,
          lng: row.longitude,
          place: row.city || "Unknown",
          state: row.state || "Unknown",
          country: row.country || "US",
          count: 1,
        });
      }
    }

    return NextResponse.json(Array.from(byZip.values()));
  } catch (error) {
    console.error("Signups API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
