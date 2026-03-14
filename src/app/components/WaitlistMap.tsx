"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const signupData = [
  { zip: "61756", lat: 40.0342, lng: -88.9578, place: "Maroa", state: "Illinois", count: 2, country: "US" },
  { zip: "30720", lat: 34.7635, lng: -84.9875, place: "Dalton", state: "Georgia", count: 2, country: "US" },
  { zip: "37129", lat: 35.871, lng: -86.4181, place: "Murfreesboro", state: "Tennessee", count: 2, country: "US" },
  { zip: "83341", lat: 42.5287, lng: -114.3657, place: "Kimberly", state: "Idaho", count: 1, country: "US" },
  { zip: "29615", lat: 34.8661, lng: -82.3198, place: "Greenville", state: "South Carolina", count: 1, country: "US" },
  { zip: "46131", lat: 39.4854, lng: -86.0608, place: "Franklin", state: "Indiana", count: 1, country: "US" },
  { zip: "96746", lat: 22.0868, lng: -159.3448, place: "Kapaa", state: "Hawaii", count: 1, country: "US" },
  { zip: "45872", lat: 41.1867, lng: -83.6806, place: "North Baltimore", state: "Ohio", count: 1, country: "US" },
  { zip: "92128", lat: 33.0067, lng: -117.069, place: "San Diego", state: "California", count: 1, country: "US" },
  { zip: "85355", lat: 33.5673, lng: -112.4387, place: "Waddell", state: "Arizona", count: 1, country: "US" },
  { zip: "72830", lat: 35.4908, lng: -93.4911, place: "Clarksville", state: "Arkansas", count: 1, country: "US" },
  { zip: "61115", lat: 42.3545, lng: -89.0397, place: "Machesney Park", state: "Illinois", count: 1, country: "US" },
  { zip: "99357", lat: 46.9156, lng: -119.5815, place: "Royal City", state: "Washington", count: 1, country: "US" },
  { zip: "30622", lat: 33.934, lng: -83.5055, place: "Bogart", state: "Georgia", count: 1, country: "US" },
  { zip: "02809", lat: 41.6825, lng: -71.2676, place: "Bristol", state: "Rhode Island", count: 1, country: "US" },
  { zip: "60048", lat: 42.281, lng: -87.95, place: "Libertyville", state: "Illinois", count: 1, country: "US" },
  { zip: "19709", lat: 39.4815, lng: -75.6832, place: "Middletown", state: "Delaware", count: 1, country: "US" },
  { zip: "33418", lat: 26.8234, lng: -80.1387, place: "Palm Beach Gardens", state: "Florida", count: 1, country: "US" },
  { zip: "36330", lat: 31.3408, lng: -85.8421, place: "Enterprise", state: "Alabama", count: 1, country: "US" },
  { zip: "28270", lat: 35.1355, lng: -80.7669, place: "Charlotte", state: "North Carolina", count: 1, country: "US" },
  { zip: "36250", lat: 33.7808, lng: -85.8924, place: "Alexandria", state: "Alabama", count: 1, country: "US" },
  { zip: "98057", lat: 47.4714, lng: -122.2203, place: "Renton", state: "Washington", count: 1, country: "US" },
  { zip: "73142", lat: 35.599, lng: -97.6251, place: "Oklahoma City", state: "Oklahoma", count: 1, country: "US" },
  { zip: "75036", lat: 33.1499, lng: -96.8241, place: "Frisco", state: "Texas", count: 1, country: "US" },
  { zip: "37830", lat: 36.0159, lng: -84.2623, place: "Oak Ridge", state: "Tennessee", count: 1, country: "US" },
  { zip: "84335", lat: 41.8403, lng: -111.8528, place: "Smithfield", state: "Utah", count: 1, country: "US" },
  { zip: "64138", lat: 38.9528, lng: -94.4705, place: "Kansas City", state: "Missouri", count: 1, country: "US" },
  { zip: "43447", lat: 41.5611, lng: -83.4381, place: "Millbury", state: "Ohio", count: 1, country: "US" },
  { zip: "18064", lat: 40.745, lng: -75.3199, place: "Nazareth", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "L7P 0A6", lat: 43.3806, lng: -79.886, place: "Burlington West", state: "Ontario", count: 1, country: "CA" },
  { zip: "06492", lat: 41.46, lng: -72.8222, place: "Wallingford", state: "Connecticut", count: 1, country: "US" },
  { zip: "94582", lat: 37.7636, lng: -121.9155, place: "San Ramon", state: "California", count: 1, country: "US" },
  { zip: "62274", lat: 38.0903, lng: -89.3858, place: "Pinckneyville", state: "Illinois", count: 1, country: "US" },
  { zip: "41048", lat: 39.0755, lng: -84.7007, place: "Hebron", state: "Kentucky", count: 1, country: "US" },
  { zip: "08865", lat: 40.7079, lng: -75.1507, place: "Phillipsburg", state: "New Jersey", count: 1, country: "US" },
  { zip: "29910", lat: 32.2513, lng: -80.8721, place: "Bluffton", state: "South Carolina", count: 1, country: "US" },
  { zip: "01543", lat: 42.3762, lng: -71.949, place: "Rutland", state: "Massachusetts", count: 1, country: "US" },
  { zip: "08037", lat: 39.638, lng: -74.7728, place: "Hammonton", state: "New Jersey", count: 1, country: "US" },
  { zip: "57006", lat: 44.3056, lng: -96.7914, place: "Brookings", state: "South Dakota", count: 1, country: "US" },
  { zip: "37388", lat: 35.3468, lng: -86.22, place: "Tullahoma", state: "Tennessee", count: 1, country: "US" },
  { zip: "60007", lat: 42.0076, lng: -87.9931, place: "Elk Grove Village", state: "Illinois", count: 1, country: "US" },
  { zip: "15061", lat: 40.6718, lng: -80.2917, place: "Monaca", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "60416", lat: 41.2908, lng: -88.2823, place: "Coal City", state: "Illinois", count: 1, country: "US" },
  { zip: "98607", lat: 45.6058, lng: -122.4142, place: "Camas", state: "Washington", count: 1, country: "US" },
  { zip: "60422", lat: 41.5406, lng: -87.6837, place: "Flossmoor", state: "Illinois", count: 1, country: "US" },
  { zip: "60056", lat: 42.0624, lng: -87.9377, place: "Mount Prospect", state: "Illinois", count: 1, country: "US" },
  { zip: "11572", lat: 40.6362, lng: -73.6375, place: "Oceanside", state: "New York", count: 1, country: "US" },
  { zip: "15613", lat: 40.5565, lng: -79.5772, place: "Apollo", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "92009", lat: 33.0954, lng: -117.2619, place: "Carlsbad", state: "California", count: 1, country: "US" },
  { zip: "98661", lat: 45.6418, lng: -122.6251, place: "Vancouver", state: "Washington", count: 1, country: "US" },
  { zip: "69361", lat: 41.872, lng: -103.6619, place: "Scottsbluff", state: "Nebraska", count: 1, country: "US" },
  { zip: "95765", lat: 38.8136, lng: -121.2677, place: "Rocklin", state: "California", count: 1, country: "US" },
  { zip: "11783", lat: 40.6795, lng: -73.491, place: "Seaford", state: "New York", count: 1, country: "US" },
  { zip: "46123", lat: 39.7629, lng: -86.3996, place: "Avon", state: "Indiana", count: 1, country: "US" },
  { zip: "50461", lat: 43.2872, lng: -92.8144, place: "Osage", state: "Iowa", count: 1, country: "US" },
  { zip: "55311", lat: 45.0725, lng: -93.4558, place: "Maple Grove", state: "Minnesota", count: 1, country: "US" },
  { zip: "07436", lat: 41.0294, lng: -74.2338, place: "Oakland", state: "New Jersey", count: 1, country: "US" },
  { zip: "29388", lat: 34.7579, lng: -82.0447, place: "Woodruff", state: "South Carolina", count: 1, country: "US" },
  { zip: "18974-4080", lat: 40.2067, lng: -75.0905, place: "Warminster", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "48450", lat: 43.2435, lng: -82.5301, place: "Lexington", state: "Michigan", count: 1, country: "US" },
  { zip: "68632", lat: 41.2528, lng: -97.13, place: "David City", state: "Nebraska", count: 1, country: "US" },
  { zip: "53149", lat: 42.8821, lng: -88.3451, place: "Mukwonago", state: "Wisconsin", count: 1, country: "US" },
  { zip: "33907", lat: 26.5681, lng: -81.8736, place: "Fort Myers", state: "Florida", count: 1, country: "US" },
  { zip: "55329", lat: 45.302, lng: -94.6039, place: "Eden Valley", state: "Minnesota", count: 1, country: "US" },
  { zip: "34711", lat: 28.5525, lng: -81.7574, place: "Clermont", state: "Florida", count: 1, country: "US" },
  { zip: "L9g3z5", lat: 43.1836, lng: -79.9902, place: "Ancaster West", state: "Ontario", count: 1, country: "CA" },
  { zip: "02893", lat: 41.7004, lng: -71.5183, place: "West Warwick", state: "Rhode Island", count: 1, country: "US" },
  { zip: "60805", lat: 41.722, lng: -87.7024, place: "Evergreen Park", state: "Illinois", count: 1, country: "US" },
  { zip: "46561", lat: 41.6695, lng: -86.087, place: "Osceola", state: "Indiana", count: 1, country: "US" },
  { zip: "02081", lat: 42.1444, lng: -71.2544, place: "Walpole", state: "Massachusetts", count: 1, country: "US" },
  { zip: "29607", lat: 34.8285, lng: -82.3516, place: "Greenville", state: "South Carolina", count: 1, country: "US" },
  { zip: "46385", lat: 41.4706, lng: -87.0783, place: "Valparaiso", state: "Indiana", count: 1, country: "US" },
  { zip: "19010", lat: 40.0236, lng: -75.3295, place: "Bryn Mawr", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "78669", lat: 30.3899, lng: -98.0539, place: "Spicewood", state: "Texas", count: 1, country: "US" },
  { zip: "60047", lat: 42.2165, lng: -88.0769, place: "Lake Zurich", state: "Illinois", count: 1, country: "US" },
  { zip: "54956", lat: 44.1811, lng: -88.4792, place: "Neenah", state: "Wisconsin", count: 1, country: "US" },
  { zip: "15236", lat: 40.3351, lng: -79.9832, place: "Pittsburgh", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "17042", lat: 40.3316, lng: -76.3976, place: "Lebanon", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "78620", lat: 30.2268, lng: -98.1029, place: "Dripping Springs", state: "Texas", count: 1, country: "US" },
  { zip: "35007", lat: 33.1934, lng: -86.7944, place: "Alabaster", state: "Alabama", count: 1, country: "US" },
  { zip: "54017", lat: 45.123, lng: -92.5366, place: "New Richmond", state: "Wisconsin", count: 1, country: "US" },
  { zip: "48906", lat: 42.7635, lng: -84.558, place: "Lansing", state: "Michigan", count: 1, country: "US" },
  { zip: "01089", lat: 42.1151, lng: -72.6411, place: "West Springfield", state: "Massachusetts", count: 1, country: "US" },
  { zip: "33511", lat: 27.9056, lng: -82.2881, place: "Brandon", state: "Florida", count: 1, country: "US" },
  { zip: "32259", lat: 30.0815, lng: -81.5477, place: "Saint Johns", state: "Florida", count: 1, country: "US" },
  { zip: "52241", lat: 41.6937, lng: -91.5906, place: "Coralville", state: "Iowa", count: 1, country: "US" },
  { zip: "58012", lat: 46.8992, lng: -97.2138, place: "Casselton", state: "North Dakota", count: 1, country: "US" },
  { zip: "53226", lat: 43.0493, lng: -88.0414, place: "Milwaukee", state: "Wisconsin", count: 1, country: "US" },
  { zip: "60451", lat: 41.5067, lng: -87.9631, place: "New Lenox", state: "Illinois", count: 1, country: "US" },
  { zip: "06074", lat: 41.8341, lng: -72.5576, place: "South Windsor", state: "Connecticut", count: 1, country: "US" },
  { zip: "78550", lat: 26.1951, lng: -97.689, place: "Harlingen", state: "Texas", count: 1, country: "US" },
  { zip: "60540", lat: 41.7662, lng: -88.141, place: "Naperville", state: "Illinois", count: 1, country: "US" },
  { zip: "15656", lat: 40.6344, lng: -79.6201, place: "Leechburg", state: "Pennsylvania", count: 1, country: "US" },
  { zip: "39110", lat: 32.4671, lng: -90.1087, place: "Madison", state: "Mississippi", count: 1, country: "US" },
  { zip: "78956", lat: 29.6882, lng: -96.9106, place: "Schulenburg", state: "Texas", count: 1, country: "US" },
  { zip: "85048", lat: 33.316, lng: -112.0669, place: "Phoenix", state: "Arizona", count: 1, country: "US" },
  { zip: "83210", lat: 43.0049, lng: -112.84, place: "Aberdeen", state: "Idaho", count: 1, country: "US" },
  { zip: "60467", lat: 41.6018, lng: -87.8899, place: "Orland Park", state: "Illinois", count: 1, country: "US" },
  { zip: "83213", lat: 43.6355, lng: -113.3176, place: "Arco", state: "Idaho", count: 1, country: "US" },
  { zip: "60404", lat: 41.5076, lng: -88.2169, place: "Shorewood", state: "Illinois", count: 1, country: "US" },
  { zip: "77080", lat: 29.8159, lng: -95.523, place: "Houston", state: "Texas", count: 1, country: "US" },
  { zip: "61523", lat: 40.9013, lng: -89.5068, place: "Chillicothe", state: "Illinois", count: 1, country: "US" },
  { zip: "60614", lat: 41.9229, lng: -87.6483, place: "Chicago", state: "Illinois", count: 1, country: "US" },
  { zip: "60447", lat: 41.4615, lng: -88.2786, place: "Minooka", state: "Illinois", count: 1, country: "US" },
  { zip: "32766", lat: 28.6607, lng: -81.1134, place: "Oviedo", state: "Florida", count: 1, country: "US" },
  { zip: "33919", lat: 26.5567, lng: -81.9034, place: "Fort Myers", state: "Florida", count: 1, country: "US" },
  { zip: "14020", lat: 43.0003, lng: -78.1929, place: "Batavia", state: "New York", count: 1, country: "US" },
  { zip: "K2M 0K9", lat: 45.2861, lng: -75.8562, place: "Kanata (Bridlewood)", state: "Ontario", count: 1, country: "CA" },
  { zip: "35242", lat: 33.3813, lng: -86.7046, place: "Birmingham", state: "Alabama", count: 1, country: "US" },
  { zip: "34231", lat: 27.2666, lng: -82.5163, place: "Sarasota", state: "Florida", count: 1, country: "US" },
  { zip: "48840", lat: 42.7531, lng: -84.3989, place: "Haslett", state: "Michigan", count: 1, country: "US" },
  { zip: "29020", lat: 34.2696, lng: -80.591, place: "Camden", state: "South Carolina", count: 1, country: "US" },
  { zip: "75087", lat: 32.9492, lng: -96.4418, place: "Rockwall", state: "Texas", count: 1, country: "US" },
  { zip: "02025", lat: 42.2395, lng: -70.8128, place: "Cohasset", state: "Massachusetts", count: 1, country: "US" },
  { zip: "92626", lat: 33.6801, lng: -117.9085, place: "Costa Mesa", state: "California", count: 1, country: "US" },
  { zip: "29429", lat: 33.0063, lng: -79.6561, place: "Awendaw", state: "South Carolina", count: 1, country: "US" },
  { zip: "61814", lat: 40.2552, lng: -87.6138, place: "Bismarck", state: "Illinois", count: 1, country: "US" },
  { zip: "37174", lat: 35.7173, lng: -86.9048, place: "Spring Hill", state: "Tennessee", count: 1, country: "US" },
  { zip: "67230", lat: 37.6808, lng: -97.1558, place: "Wichita", state: "Kansas", count: 1, country: "US" },
  { zip: "78734", lat: 30.3705, lng: -97.9427, place: "Austin", state: "Texas", count: 1, country: "US" },
  { zip: "70601", lat: 30.2285, lng: -93.188, place: "Lake Charles", state: "Louisiana", count: 1, country: "US" },
  { zip: "35487", lat: 33.3072, lng: -87.5859, place: "Tuscaloosa", state: "Alabama", count: 1, country: "US" },
  { zip: "46953", lat: 40.5359, lng: -85.6616, place: "Marion", state: "Indiana", count: 1, country: "US" },
];

const totalSignups = signupData.reduce((sum, d) => sum + d.count, 0);
const uniqueLocations = signupData.length;
const usStates = [...new Set(signupData.filter((d) => d.country === "US").map((d) => d.state))];
const countries = [...new Set(signupData.map((d) => d.country))];

const stateCounts: Record<string, number> = {};
signupData
  .filter((d) => d.country === "US")
  .forEach((d) => {
    stateCounts[d.state] = (stateCounts[d.state] || 0) + d.count;
  });
const topStates = Object.entries(stateCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

export default function WaitlistMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
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

    signupData.forEach((d) => {
      let color: string;
      let radius: number;

      if (d.country !== "US") {
        color = "#a78bfa"; // purple for international
        radius = 7;
      } else if (d.count > 1) {
        color = "#39ff14"; // neon green for multiple
        radius = 9;
      } else {
        color = "#3b82f6"; // blue for single
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
            : d.country;

      marker.bindPopup(
        `<div style="font-family: system-ui, sans-serif; font-size: 13px; line-height: 1.5;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">${d.place}</div>
          <div><span style="color: #39ff14; font-weight: 600;">${d.zip}</span> &middot; ${regionLabel}</div>
          <div style="color: #888;">${d.count} signup${d.count > 1 ? "s" : ""}</div>
        </div>`,
        {
          className: "dark-popup",
        }
      );
    });

    const bounds = L.latLngBounds(signupData.map((d) => [d.lat, d.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="w-full max-w-4xl">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          THE <span className="text-neon">DEMAND</span> IS REAL
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          People across the country are already on the waitlist.
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
        <div
          ref={mapRef}
          className="w-full h-[300px] sm:h-[450px]"
        />

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

          {/* Top States - hidden on very small screens */}
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
