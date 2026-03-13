import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, organization, zipCode } = body;

    if (!firstName || !lastName || !email || !phone || !zipCode) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/waitlist_signups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        organization: organization || null,
        zip_code: zipCode,
      }),
    });

    if (!supabaseRes.ok) {
      const err = await supabaseRes.text();
      console.error("Supabase error:", err);
      return NextResponse.json(
        { error: "Failed to save your information. Please try again." },
        { status: 500 }
      );
    }

    // Send notification email to info@shredmill.com
    try {
      await getResend().emails.send({
        from: "Shredmill Ground <noreply@shredmillground.com>",
        to: "info@shredmill.com",
        subject: `New Waitlist Signup: ${firstName} ${lastName}`,
        html: `
          <h2>New Shredmill Ground Waitlist Signup</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Organization</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${organization || "N/A"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">ZIP Code</td><td style="padding: 8px;">${zipCode}</td></tr>
          </table>
        `,
      });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    // Send confirmation email to the person who signed up
    try {
      await getResend().emails.send({
        from: "Shredmill Ground <noreply@shredmillground.com>",
        to: email,
        subject: "You're on the Shredmill Ground Waitlist!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; padding: 40px 30px; color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 28px; margin: 0;">
                <span style="color: #39ff14;">SHREDMILL</span> GROUND
              </h1>
            </div>
            <h2 style="color: #39ff14; text-align: center; font-size: 22px;">You're on the list, ${firstName}!</h2>
            <p style="color: #aaaaaa; text-align: center; font-size: 16px; line-height: 1.6;">
              Thanks for signing up. We'll keep you updated as we get closer to launch day on <strong style="color: #ffffff;">March 25, 2026</strong>.
            </p>
            <hr style="border: none; border-top: 1px solid #222222; margin: 30px 0;" />
            <p style="color: #666666; text-align: center; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Shredmill. All rights reserved.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Confirmation email failed:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
