"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { fetchAllResumeAnalysis } from "./[id]/fetchAllResumeAnalysis";
import { IResumeAnalysisResult } from "./[id]/fetchResumeAnalysis";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiPlus, FiArrowRight, FiFileText, FiCalendar } from "react-icons/fi";

dayjs.extend(relativeTime);

const getScoreColor = (score: number) => {
  if (score >= 0 && score <= 39) return "text-red-400 bg-red-500/10 border-red-500/20";
  if (score >= 40 && score <= 69) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
  if (score >= 70 && score <= 89) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  if (score >= 90 && score <= 100) return "text-violet-400 bg-violet-500/10 border-violet-500/20";
  return "text-neutral-400 bg-neutral-500/10 border-neutral-500/20";
};

export default function ResultPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const [allAnalysisData, setAllAnalysisData] = useState<IResumeAnalysisResult[]>([]);
  const [loadingAll, setLoadingAll] = useState<boolean>(true);
  const [errorAll, setErrorAll] = useState<string | null>(null);

  const handleRetry = () => {
    setErrorAll(null);
    setLoadingAll(true);
    fetchAllAnalyses();
  };

  async function fetchAllAnalyses() {
    const token = await getToken();
    if (!isLoaded || !isSignedIn) {
      if (isLoaded) {
        setErrorAll("User not authenticated");
      }
      setLoadingAll(false);
      return;
    }
    try {
      setLoadingAll(true);
      setErrorAll(null);
      if (!token) {
        if (isSignedIn) {
          setTimeout(fetchAllAnalyses, 500);
          return;
        }
        router.push("/sign-in");
        return;
      }
      const results = await fetchAllResumeAnalysis({ token });
      const sortedResults = results.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setAllAnalysisData(sortedResults);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorAll(error.message || "Failed to load analyses");
      } else {
        setErrorAll("Failed to load analyses");
      }
    } finally {
      setLoadingAll(false);
    }
  }

  useEffect(() => {
    fetchAllAnalyses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  if (loadingAll) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/6" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
        </div>
        <p className="text-sm text-neutral-500 font-medium">Loading analyses…</p>
      </div>
    );
  }

  if (errorAll) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-red-500/8 border border-red-500/15 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-400">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-bold text-white mb-1">Something went wrong</p>
          <p className="text-sm text-neutral-500 max-w-sm leading-relaxed font-light">{errorAll}</p>
        </div>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm transition-all duration-200 hover:bg-neutral-100 hover:scale-105 shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/8 bg-white/3 text-neutral-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">
            Dashboard
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Your Analyses{" "}
            <span className="text-neutral-500 font-light italic text-2xl ml-1">
              ({allAnalysisData.length})
            </span>
          </h1>
          <p className="text-neutral-500 text-sm font-light mt-1">
            Review and track previous resume-to-job matching evaluations.
          </p>
        </div>

        <Link
          href="/#upload"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-black font-bold px-5 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.03] shadow-lg text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Analysis</span>
        </Link>
      </div>

      {allAnalysisData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01] p-8">
          <div className="w-14 h-14 mb-5 rounded-2xl bg-violet-500/8 border border-violet-500/15 flex items-center justify-center">
            <FiFileText className="w-6 h-6 text-violet-400" />
          </div>
          <p className="text-lg font-bold text-white mb-2 tracking-tight">No analyses found</p>
          <p className="text-sm text-neutral-500 max-w-sm mb-6 font-light leading-relaxed">
            You haven&apos;t run any resume analyses yet. Let&apos;s evaluate your first resume!
          </p>
          <Link
            href="/#upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-bold text-sm transition-all duration-200 hover:bg-neutral-100 hover:scale-105 shadow-md shadow-white/5"
          >
            Get Started
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allAnalysisData.map((item, index) => {
            const overallColor = getScoreColor(item.overall_fit_score);
            return (
              <div
                key={item._id || index}
                onClick={() => router.push(`/result/${item._id}`)}
                className="group flex flex-col justify-between p-6 rounded-3xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/12 transition-all duration-300 cursor-pointer relative overflow-hidden h-[240px]"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, rgba(129,140,248,0.03) 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col gap-3">
                  {/* Top line: Icon + Date */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-violet-500/10 group-hover:border-violet-500/15 transition-colors">
                      <FiFileText className="w-4 h-4 text-neutral-400 group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-600 font-medium">
                      <FiCalendar className="w-3 h-3" />
                      <span>{dayjs(item.createdAt).fromNow()}</span>
                    </div>
                  </div>

                  {/* Title & snippet */}
                  <div>
                    <h3 className="text-base font-bold text-white truncate group-hover:text-violet-400 transition-colors">
                      {item.resumeFileName || "Untitled Resume"}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 font-light leading-relaxed">
                      {item.jobDescriptionText || "No job description provided."}
                    </p>
                  </div>
                </div>

                {/* Bottom line: Scores & arrow */}
                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5">
                  {/* Scores row */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${overallColor} tabular-nums`}>
                      {item.overall_fit_score}% Fit
                    </span>
                    <span className="text-[10px] text-neutral-600 font-medium">
                      KW: {item.keyword_match_score}%
                    </span>
                  </div>

                  {/* Action Link */}
                  <span className="text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1 text-xs font-medium">
                    <span>View</span>
                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
