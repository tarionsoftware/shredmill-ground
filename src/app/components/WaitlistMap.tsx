"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SignupLocation {
  zip: string;
  lat: number;
  lng: number;
  place: string;
  state: string;
  country: string;
  count: number;
}

export default function WaitlistMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [data, setData] = useState<SignupLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/signups")
      .then((res) => res.json())
      .then((signups) => {
        setData(signups);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || data.length === 0) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      maxBoundsViscosity: 1.0,
      maxBounds: [[-85, -180], [85, 180]],
      worldCopyJump: false,
      minZoom: 2,
    }).setView([39.5, -98.0], 4);

    mapInstanceRef.current = map;

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        subdomains: "abcd",
      }
    ).addTo(map);

    data.forEach((d) => {
      let color: string;
      let radius: number;

      if (d.country !== "US" && d.country !== "CA") {
        color = "#a78bfa";
        radius = 7;
      } else if (d.country === "CA") {
        color = "#a78bfa";
        radius = 7;
      } else if (d.count > 1) {
        color = "#39ff14";
        radius = 9;
      } else {
        color = "#3b82f6";
        radius = 6;
      }

      const marker = L.circleMarker([d.lat, d.lng], {
        radius,
        fillColor: color,
        color: "rgba(255,255,255,0.3)",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.85,
      }).addTo(map);

      const regionLabel =
        d.country === "US"
          ? d.state
          : d.country === "CA"
            ? "Canada"
            : d.country === "GB"
              ? "United Kingdom"
              : d.country;

      marker.bindPopup(
        `<div style="font-family: system-ui, sans-serif; font-size: 13px; line-height: 1.5;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">${d.place}</div>
          <div><span style="color: #39ff14; font-weight: 600;">${d.zip}</span> &middot; ${regionLabel}</div>
          <div style="color: #888;">${d.count} signup${d.count > 1 ? "s" : ""}</div>
        </div>`,
        { className: "dark-popup" }
      );
    });

    const bounds = L.latLngBounds(data.map((d) => [d.lat, d.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [data]);

  const totalSignups = data.reduce((sum, d) => sum + d.count, 0);
  const uniqueLocations = data.length;
  const usStates = [...new Set(data.filter((d) => d.country === "US").map((d) => d.state))];
  const countries = [...new Set(data.map((d) => d.country))];

  const stateCounts: Record<string, number> = {};
  data
    .filter((d) => d.country === "US")
    .forEach((d) => {
      stateCounts[d.state] = (stateCounts[d.state] || 0) + d.count;
    });
  const topStates = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (loading) {
    return (
      <div className="w-full max-w-4xl">
        <div className="h-[400px] bg-card-bg border border-card-border rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          THE <span className="text-neon">DEMAND</span> IS REAL
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          People across the world are already on the waitlist.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 sm:gap-6 mb-4">
        {[
          { value: totalSignups, label: "Signups" },
          { value: uniqueLocations, label: "Locations" },
          { value: usStates.length, label: "States" },
          { value: countries.length, label: "Countries" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl sm:text-4xl font-extrabold text-neon leading-none">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Map Container */}
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div ref={mapRef} className="w-full h-[300px] sm:h-[450px]" />

        {/* Legend */}
        <div className="px-4 py-3 border-t border-card-border flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39ff14] border border-white/20 inline-block" />
            <span>2+ signups</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] border border-white/20 inline-block" />
            <span>1 signup</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a78bfa] border border-white/20 inline-block" />
            <span>International</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 ml-auto">
            {topStates.map(([state, count]) => (
              <span
                key={state}
                className="bg-white/5 px-2.5 py-1 rounded-full text-zinc-400"
              >
                <strong className="text-neon">{count}</strong> {state}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
