"use client";

import { Hero } from "@/components/Hero";
import UploadResume from "@/components/UploadResume";
import HowItWorksSection from "@/components/HowItWorks";

/* ── Subtle stat strip ── */
const stats = [
  { value: "< 60s", label: "Time to results" },
  { value: "GPT-5", label: "Powered by" },
  { value: "100%", label: "Free forever" },
  { value: "ATS-aware", label: "Analysis type" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between pt-2 relative overflow-hidden min-h-screen">
      {/* Subtle spotlight */}
      <div
        className="pointer-events-none absolute top-[-5%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] opacity-60"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full flex flex-col">
        <Hero />

        {/* ── Stats strip ── */}
        <div className="w-full max-w-3xl mx-auto px-4 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-5 px-4 bg-[#080808] hover:bg-white/[0.02] transition-colors duration-200"
              >
                <span className="text-lg md:text-xl font-black text-white tracking-tight mb-0.5">
                  {value}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <HowItWorksSection />
        <UploadResume />
      </div>
    </div>
  );
}
