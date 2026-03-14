import Image from "next/image";
import CountdownTimer from "./components/CountdownTimer";
import WaitlistForm from "./components/WaitlistForm";
import WaitlistMapWrapper from "./components/WaitlistMapWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <main className="flex flex-col items-center px-6 pt-12 pb-20 sm:pt-20">
        {/* Logo */}
        <div className="animate-fade-in-up mb-8">
          <Image
            src="/shredmill-logo.png"
            alt="Shredmill"
            width={180}
            height={180}
            priority
            className="rounded-full"
          />
        </div>

        {/* Headline */}
        <div className="animate-fade-in-up-delay-1 text-center mb-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            THE{" "}
            <span className="text-neon">SHREDMILL</span>
            {" "}GROUND
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto">
            The next evolution in speed and agility training is almost here.
          </p>
        </div>

        {/* Countdown */}
        <div className="animate-fade-in-up-delay-2 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 text-center mb-6">
            Launching March 25, 2026
          </p>
          <CountdownTimer />
        </div>

        {/* Product Image */}
        <div className="animate-fade-in-up-delay-3 mb-16 w-full max-w-lg">
          <Image
            src="/shredmill-product.png"
            alt="Shredmill Ground Training Equipment"
            width={800}
            height={772}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Waitlist Map */}
        <div className="mb-16 w-full flex justify-center px-0 sm:px-6">
          <WaitlistMapWrapper />
        </div>

        {/* Waitlist Form */}
        <div className="animate-fade-in-up-delay-3 w-full max-w-md">
          <div className="bg-card-bg border border-card-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-2">
              Get on the List
            </h2>
            <p className="text-zinc-400 text-center mb-8 text-sm">
              Be the first to know when the Shredmill Ground is available.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-zinc-600 text-sm border-t border-card-border">
        &copy; {new Date().getFullYear()} Shredmill. All rights reserved.
      </footer>
    </div>
  );
}
