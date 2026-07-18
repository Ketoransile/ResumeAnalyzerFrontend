"use client";

import { useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";

const steps = [
  {
    number: "01",
    icon: AiOutlineUpload,
    label: "Upload",
    title: "Drop your resume",
    description:
      "Drag and drop your PDF — our system reads it exactly like a human recruiter, not just a keyword parser.",
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.07)",
    borderHover: "rgba(129,140,248,0.2)",
  },
  {
    number: "02",
    icon: RiFileCopyLine,
    label: "Target",
    title: "Paste the job post",
    description:
      "Add the role you're going for. The AI benchmarks your profile against every requirement — visible and implied.",
    accent: "#c084fc",
    glow: "rgba(192,132,252,0.07)",
    borderHover: "rgba(192,132,252,0.2)",
  },
  {
    number: "03",
    icon: MdOutlineTipsAndUpdates,
    label: "Improve",
    title: "Get your blueprint",
    description:
      "Receive a match score, missing keywords, and clear, prioritized actions to triple your chances of an interview.",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.07)",
    borderHover: "rgba(52,211,153,0.2)",
  },
];

export default function HowItWorksSection() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <section
      id="howItWorks"
      className="relative flex flex-col items-center justify-center py-28 w-full px-4 md:px-0"
    >
      {/* Section label */}
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/8 bg-white/3 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
        The Process
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-[3.2rem] font-black text-center leading-[1.1] tracking-[-0.03em] mb-4 text-white">
        Three steps to a{" "}
        <em
          className="not-italic font-black"
          style={{
            background:
              "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          stronger
        </em>{" "}
        application
      </h2>

      <p className="text-neutral-500 text-sm md:text-base text-center max-w-lg mb-16 leading-relaxed font-light">
        No fluff. No vague tips.{" "}
        <em className="text-neutral-300 not-italic">Precise, actionable intelligence</em> that
        moves your resume from overlooked to shortlisted.
      </p>

      {/* Steps grid */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Connector line (desktop) */}
        <div className="hidden lg:block absolute top-[68px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="how-it-works-card group flex flex-col p-8 rounded-3xl border border-white/6 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 cursor-default relative overflow-hidden"
                style={
                  {
                    "--glow": step.glow,
                    "--border-hover": step.borderHover,
                  } as React.CSSProperties
                }
              >
                {/* Background hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${step.glow}, transparent 70%)` }}
                />

                {/* Step number + icon row */}
                <div className="relative z-10 flex items-start justify-between mb-8">
                  <span
                    className="text-[0.65rem] font-black tracking-[0.25em] uppercase"
                    style={{ color: step.accent + "aa" }}
                  >
                    {step.label}
                  </span>
                  <span className="text-[2rem] font-black text-white/5 tabular-nums leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/8 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${step.accent}22, ${step.accent}08)`,
                    boxShadow: `0 0 24px ${step.accent}20`,
                  }}
                >
                  <Icon style={{ color: step.accent }} className="text-2xl" />
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-lg font-bold text-white mb-3 leading-tight tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="relative z-10 text-neutral-500 text-sm leading-[1.75] font-light group-hover:text-neutral-400 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
