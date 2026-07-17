import Link from "next/link";
import { Button } from "./ui/button";
import { Highlight } from "./ui/hero-highlight";

export const Hero = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center pt-10 pb-16 md:pb-24">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs font-medium tracking-wide animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span>ElevateCV v2.0 - Powered by GPT-5</span>
      </div>

      {/* Main Heading */}
      <h1 className="w-full md:w-[85%] lg:w-[75%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-extrabold tracking-tight leading-[1.1] font-display">
        AI Knows What Recruiters Want —{" "}
        <Highlight className="text-white bg-indigo-600/20 border border-indigo-500/20 px-3 py-1.5 rounded-2xl">
          Does Your Resume?
        </Highlight>
      </h1>

      {/* Subheading / Description */}
      <p className="text-neutral-400 text-sm sm:text-base md:text-lg text-center max-w-2xl leading-relaxed px-4 mt-2">
        Let our AI-powered resume analyzer review your resume the way a
        recruiter would. Instantly get a score along with detailed, actionable
        tips to improve your chances of landing interviews—completely free.
      </p>

      {/* Action Button */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <Button
          className="py-6 px-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-base md:text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 border-0"
          asChild
        >
          <Link href="#upload-resume-form">
            Get Started - It&apos;s 100% Free!
          </Link>
        </Button>
        <span className="text-xs text-neutral-500 tracking-wider">
          No credit card required. Instant analysis.
        </span>
      </div>
    </div>
  );
};
