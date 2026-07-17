import { useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";

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
    <div
      id="howItWorks"
      className="relative flex flex-col items-center justify-center py-24
                 bg-transparent w-full text-white px-4 md:px-0"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full md:h-[600px] bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-16 text-center z-10 font-display tracking-tight">
        How It Works
      </h2>

      <div
        className="relative z-10 flex flex-col lg:flex-row items-stretch justify-center
                     gap-8 max-w-6xl mx-auto"
      >
        {/* Step 1: Upload Your Resume */}
        <div
          className="group flex flex-col items-center text-center p-8
                     bg-neutral-950/40 backdrop-blur-md rounded-2xl border border-white/5
                     w-full lg:w-1/3 min-h-[320px] 
                     hover:border-indigo-500/30 hover:bg-neutral-950/70 hover:shadow-2xl hover:shadow-indigo-500/5
                     transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
            <AiOutlineUpload className="text-3xl text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 font-display">Step 1</span>
          <h3 className="text-xl font-bold text-white mb-3 font-display">
            Upload Your Resume
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
            Drag and drop your PDF resume. Our secure system instantly processes your document for analysis.
          </p>
        </div>

        {/* Step 2: Paste the Job Description */}
        <div
          className="group flex flex-col items-center text-center p-8
                     bg-neutral-950/40 backdrop-blur-md rounded-2xl border border-white/5
                     w-full lg:w-1/3 min-h-[320px] 
                     hover:border-purple-500/30 hover:bg-neutral-950/70 hover:shadow-2xl hover:shadow-purple-500/5
                     transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
            <RiFileCopyLine className="text-3xl text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2 font-display">Step 2</span>
          <h3 className="text-xl font-bold text-white mb-3 font-display">
            Paste Job Details
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
            Copy the job description you&apos;re targeting. Our AI uses this to benchmark your profile against the role.
          </p>
        </div>

        {/* Step 3: Optimize Your Resume */}
        <div
          className="group flex flex-col items-center text-center p-8
                     bg-neutral-950/40 backdrop-blur-md rounded-2xl border border-white/5
                     w-full lg:w-1/3 min-h-[320px] 
                     hover:border-emerald-500/30 hover:bg-neutral-950/70 hover:shadow-2xl hover:shadow-emerald-500/5
                     transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
            <MdOutlineTipsAndUpdates className="text-3xl text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-display">Step 3</span>
          <h3 className="text-xl font-bold text-white mb-3 font-display">
            Get Actionable Feedback
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
            Receive a detailed score, missing keywords, and tailored suggestions to triple your interview chances.
          </p>
        </div>
      </div>
    </div>
  );
}
