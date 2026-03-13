"use client";

import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  zipCode: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  zipCode: "",
};

export default function WaitlistForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-neon/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">You&apos;re on the list!</h3>
        <p className="text-zinc-400">
          We&apos;ll be in touch with updates as we get closer to launch day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-zinc-400 mb-1.5">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={update("firstName")}
            className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-colors"
            placeholder="First"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={update("lastName")}
            className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-colors"
            placeholder="Last"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1.5">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-colors"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-1.5">
          Phone *
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={form.phone}
          onChange={update("phone")}
          className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-colors"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-zinc-400 mb-1.5">
          Organization / School
        </label>
        <input
          id="organization"
          type="text"
          value={form.organization}
          onChange={update("organization")}
          className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-colors"
          placeholder="Your team, school, or facility"
        />
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-zinc-400 mb-1.5">
          ZIP Code *
        </label>
        <input
          id="zipCode"
          type="text"
          required
          value={form.zipCode}
          onChange={update("zipCode")}
          className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-colors"
          placeholder="12345"
          maxLength={10}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="glow-button w-full bg-neon text-black font-bold py-3.5 px-6 rounded-lg hover:bg-neon-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide"
      >
        {status === "loading" ? "Submitting..." : "GET ON THE LIST"}
      </button>
    </form>
  );
}
