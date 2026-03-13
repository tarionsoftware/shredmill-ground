"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-03-25T00:00:00-05:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(0, LAUNCH_DATE - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="countdown-digit rounded-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[90px] text-center">
        <span className="text-3xl sm:text-5xl font-black tabular-nums text-neon">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-5">
      <Digit value={timeLeft.days} label="Days" />
      <Digit value={timeLeft.hours} label="Hours" />
      <Digit value={timeLeft.minutes} label="Min" />
      <Digit value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
