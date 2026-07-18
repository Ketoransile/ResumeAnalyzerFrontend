import Link from "next/link";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="hero-section flex flex-col gap-8 items-center justify-center pt-16 pb-20 md:pb-32">
      {/* Eyebrow badge */}
      <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-300 text-xs font-semibold tracking-widest uppercase">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
        </span>
        AI-Powered · Resume Intelligence · Free
      </div>

      {/* Main Heading */}
      <div className="flex flex-col items-center gap-3 w-full md:w-[88%] lg:w-[78%]">
        <h1 className="hero-title text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[5.2rem] text-center font-black tracking-[-0.03em] leading-[1.05] text-white">
          Your resume is{" "}
          <em className="hero-em not-italic font-black" style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            speaking
          </em>
          .
          <br />
          <span className="hero-subtitle-line text-white/75 font-light italic" style={{ fontSize: "0.82em" }}>
            Is it saying the right thing?
          </span>
        </h1>
      </div>

      {/* Subheading */}
      <p className="hero-description text-neutral-400 text-sm sm:text-base md:text-[1.05rem] text-center max-w-[580px] leading-[1.8] px-4 font-light">
        Our AI reads your resume{" "}
        <em className="text-neutral-200 not-italic font-medium">exactly like a recruiter would</em>
        {" "}— surfacing gaps, scoring your fit, and giving you precise, human-level guidance to land more interviews.
      </p>

      {/* Social proof micro-line */}
      <div className="flex items-center gap-3 text-xs text-neutral-600 font-medium tracking-wide">
        <span className="flex items-center gap-1.5">
          <span className="text-violet-400 text-base">✦</span> Instant analysis
        </span>
        <span className="text-neutral-700">·</span>
        <span className="flex items-center gap-1.5">
          <span className="text-violet-400 text-base">✦</span> No credit card
        </span>
        <span className="text-neutral-700">·</span>
        <span className="flex items-center gap-1.5">
          <span className="text-violet-400 text-base">✦</span> 100% free
        </span>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
        <Button
          className="hero-cta group relative overflow-hidden py-6 px-10 bg-white text-black text-base font-bold rounded-2xl transition-all duration-300 hover:bg-neutral-100 shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-105 border-0"
          asChild
        >
          <Link href="#upload-resume-form">
            <span className="relative z-10">Analyze My Resume</span>
          </Link>
        </Button>

        <Link
          href="#howItWorks"
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-200 transition-colors duration-200 font-medium group"
        >
          <span>See how it works</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Decorative divider */}
      <div className="hero-divider w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent mt-4" />
    </div>
  );
};
