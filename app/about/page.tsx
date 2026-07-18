import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  FiTarget,
  FiClock,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiSearch,
} from "react-icons/fi";

const benefits = [
  {
    icon: FiTarget,
    title: "Pinpoint relevance",
    description:
      "See exactly which requirements you hit and which you miss — before the recruiter does.",
    accent: "#818cf8",
  },
  {
    icon: FiClock,
    title: "Seconds, not hours",
    description:
      "Skip the manual cross-referencing. Our AI does in 30 seconds what takes humans an afternoon.",
    accent: "#c084fc",
  },
  {
    icon: FiTrendingUp,
    title: "Surface hidden gaps",
    description:
      "Discover the skills and phrases you're missing — the ones that separate shortlisted from ignored.",
    accent: "#34d399",
  },
  {
    icon: FiShield,
    title: "Apply with confidence",
    description:
      "Know your resume is tuned for the specific role. No more guessing if you're a good fit.",
    accent: "#f59e0b",
  },
  {
    icon: FiZap,
    title: "GPT-5 intelligence",
    description:
      "Not keyword matching — genuine contextual reasoning that understands nuance, tone, and implied requirements.",
    accent: "#818cf8",
  },
  {
    icon: FiSearch,
    title: "ATS-aware analysis",
    description:
      "Optimized for how applicant tracking systems actually parse and rank resumes in the real world.",
    accent: "#c084fc",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your resume",
    detail: "Drop your PDF. Our parser reads structure, not just text — understanding headings, sections, and hierarchy.",
  },
  {
    number: "02",
    title: "Paste the job listing",
    detail: "Copy the full posting. The AI extracts explicit requirements and the implicit expectations hidden between the lines.",
  },
  {
    number: "03",
    title: "Get your blueprint",
    detail: "Receive a match score, skill gap breakdown, keyword suggestions, tone analysis, and prioritized actions to improve.",
  },
];

const AboutPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* ── Hero section ── */}
      <section className="flex flex-col items-center text-center pt-10 pb-20 md:pt-14 md:pb-28 max-w-3xl mx-auto px-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
          About ElevateCV
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[-0.03em] leading-[1.1] text-white mb-6">
          We built the tool{" "}
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
            we wished existed
          </em>{" "}
          when we were applying.
        </h1>

        <p className="text-neutral-400 text-base md:text-lg leading-[1.8] font-light max-w-2xl">
          Most resume advice is vague.{" "}
          <em className="not-italic text-neutral-200 font-medium">
            &ldquo;Tailor it to the job.&rdquo;
          </em>{" "}
          But nobody tells you <em className="italic text-neutral-300">how</em>.
          ElevateCV does — with precision, context, and AI that genuinely understands
          what recruiters look for.
        </p>
      </section>

      {/* ── The problem / solution ── */}
      <section className="max-w-4xl mx-auto px-4 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="p-8 md:p-10 rounded-3xl border border-white/6 bg-white/[0.02] relative overflow-hidden group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(239,68,68,0.04), transparent 60%)",
              }}
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400/60 mb-4 block">
              The problem
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight tracking-[-0.01em]">
              Great candidates get passed over{" "}
              <em className="italic font-normal text-neutral-400">every single day</em>
            </h2>
            <p className="text-neutral-500 text-sm leading-[1.8] font-light">
              Not because they&apos;re unqualified — because their resume doesn&apos;t
              speak the language of the role. Keyword mismatches, buried
              qualifications, and generic summaries silently disqualify thousands
              of strong applicants before a human ever reads their profile.
            </p>
          </div>

          {/* Solution */}
          <div className="p-8 md:p-10 rounded-3xl border border-white/6 bg-white/[0.02] relative overflow-hidden group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 80% 80%, rgba(129,140,248,0.05), transparent 60%)",
              }}
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/60 mb-4 block">
              Our answer
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight tracking-[-0.01em]">
              AI that reads resumes{" "}
              <em
                className="not-italic font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #a78bfa, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                like a hiring manager
              </em>
            </h2>
            <p className="text-neutral-500 text-sm leading-[1.8] font-light">
              ElevateCV uses{" "}
              <span className="text-neutral-300 font-medium">GPT-5</span> to
              perform deep, contextual analysis — not keyword counting. It
              understands implied requirements, evaluates tone, and gives you a
              clear, prioritized roadmap to improve your fit for any role.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-4xl mx-auto px-4 pb-24 md:pb-32">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 bg-white/3 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            How it works
          </div>
          <h2 className="text-2xl md:text-[2.5rem] font-black text-white leading-[1.1] tracking-[-0.03em]">
            Simple by design,{" "}
            <em className="italic font-light text-neutral-400">powerful underneath</em>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group flex items-start gap-6 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300"
            >
              {/* Step number */}
              <span
                className="flex-shrink-0 text-2xl md:text-3xl font-black tabular-nums leading-none mt-1"
                style={{
                  background:
                    "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {step.number}
              </span>

              <div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2 tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-[1.75] font-light group-hover:text-neutral-400 transition-colors duration-300">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits grid ── */}
      <section className="max-w-5xl mx-auto px-4 pb-24 md:pb-32">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 bg-white/3 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Why ElevateCV
          </div>
          <h2 className="text-2xl md:text-[2.5rem] font-black text-white leading-[1.1] tracking-[-0.03em]">
            Built for people who are{" "}
            <em
              className="not-italic font-black"
              style={{
                background:
                  "linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              tired of guessing
            </em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group flex flex-col p-7 rounded-3xl border border-white/6 bg-white/[0.02] hover:-translate-y-1 hover:border-white/12 transition-all duration-400 relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${benefit.accent}0a, transparent 60%)`,
                  }}
                />

                <div
                  className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 ring-1 ring-white/8 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${benefit.accent}18, ${benefit.accent}08)`,
                  }}
                >
                  <Icon
                    style={{ color: benefit.accent }}
                    className="w-5 h-5"
                  />
                </div>

                <h3 className="relative z-10 text-sm font-bold text-white mb-2 tracking-[-0.01em]">
                  {benefit.title}
                </h3>
                <p className="relative z-10 text-neutral-600 text-[13px] leading-[1.7] font-light group-hover:text-neutral-500 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Vision / closing ── */}
      <section className="max-w-3xl mx-auto px-4 pb-24 md:pb-32 text-center">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent mx-auto mb-10" />

        <h2 className="text-2xl md:text-3xl font-black text-white leading-[1.15] tracking-[-0.03em] mb-5">
          Our vision
        </h2>
        <p className="text-neutral-500 text-sm md:text-base leading-[1.8] font-light mb-10 max-w-xl mx-auto">
          Career success shouldn&apos;t depend on whether you know the{" "}
          <em className="italic text-neutral-400">right way to phrase things</em>.
          We&apos;re building tools that give every candidate — regardless of
          background — the same level of strategic insight that career coaches
          charge hundreds for.{" "}
          <span className="text-neutral-300 font-medium not-italic">
            Accessible. Intelligent. Free.
          </span>
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Button
            className="group relative overflow-hidden bg-white text-black font-bold py-6 px-10 rounded-2xl transition-all duration-300 hover:bg-neutral-100 shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-105 border-0 text-base"
            asChild
          >
            <Link href="/#upload-resume-form">
              <span className="relative z-10">Analyze My Resume →</span>
            </Link>
          </Button>
          <span className="text-xs text-neutral-700 font-medium tracking-wide">
            No sign-up wall. No credit card. Just results.
          </span>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
