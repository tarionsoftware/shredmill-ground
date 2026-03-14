"use client";

import dynamic from "next/dynamic";

const WaitlistMap = dynamic(() => import("./WaitlistMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl h-[400px] bg-card-bg border border-card-border rounded-2xl animate-pulse" />
  ),
});

export default function WaitlistMapWrapper() {
  return <WaitlistMap />;
}
