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
      className="relative flex flex-col items-center justify-center pt-20 pb-20
                 bg-transparent ml-2 p-2 min-h-screen text-white px-4 md:px-0"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-20 text-center z-10">
        How It Works
      </h1>

      <div
        className="relative z-10 flex flex-col md:flex-row items-stretch justify-center
                     gap-6 max-w-6xl mx-auto"
      >
        {/* Step 1: Upload Your Resume */}
        <div
          className="group flex flex-col items-center text-center p-8
                     bg-neutral-900/50 backdrop-blur-sm rounded-3xl border border-white/10
                     w-full md:w-1/3 min-h-[320px] 
                     hover:border-indigo-500/50 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-indigo-500/10 
                     transition-all duration-500"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
            <AiOutlineUpload className="text-3xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
            1. Upload Your Resume
          </h2>
          <p className="text-neutral-400 leading-relaxed max-w-xs">
            Drag and drop your PDF resume. Our secure system instantly processes your document for analysis.
          </p>
        </div>

        {/* Arrow/Separator for Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center pt-12">
          <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

        {/* Step 2: Paste the Job Description */}
        <div
          className="group flex flex-col items-center text-center p-8
                     bg-neutral-900/50 backdrop-blur-sm rounded-3xl border border-white/10
                     w-full md:w-1/3 min-h-[320px] 
                     hover:border-purple-500/50 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-purple-500/10 
                     transition-all duration-500"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
            <RiFileCopyLine className="text-3xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
            2. Paste Job Details
          </h2>
          <p className="text-neutral-400 leading-relaxed max-w-xs">
            Copy the job description you&apos;re targeting. Our AI uses this to benchmark your profile against the role.
          </p>
        </div>

        {/* Arrow/Separator for Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center pt-12">
          <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

        {/* Step 3: Optimize Your Resume */}
        <div
          className="group flex flex-col items-center text-center p-8
                     bg-neutral-900/50 backdrop-blur-sm rounded-3xl border border-white/10
                     w-full md:w-1/3 min-h-[320px] 
                     hover:border-emerald-500/50 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-emerald-500/10 
                     transition-all duration-500"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
            <MdOutlineTipsAndUpdates className="text-3xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
            3. Get Actionable Feedback
          </h2>
          <p className="text-neutral-400 leading-relaxed max-w-xs">
            Receive a detailed score, missing keywords, and tailored suggestions to triple your interview chances.
          </p>
        </div>
      </div>
    </div>
  );
}
