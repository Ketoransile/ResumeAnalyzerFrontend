"use client";
import LeftSidebar from "@/components/LeftSidebar";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { fetchAllResumeAnalysis } from "./[id]/fetchAllResumeAnalysis";
import { IResumeAnalysisResult } from "./[id]/fetchResumeAnalysis";
export default function ResultPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const [allAnalysisData, setAllAnalysisData] = useState<
    IResumeAnalysisResult[]
  >([]);

  const [loadingAll, setLoadingAll] = useState<boolean>(true);
  const [errorAll, setErrorAll] = useState<string | null>(null);
  const handleCardClick = (item: IResumeAnalysisResult) => {
    router.push(`/result/${item._id}`);
  };

  const handleRetry = () => {
    setErrorAll(null);
    setLoadingAll(true);
    fetchAllAnalyses();
  };

  async function fetchAllAnalyses() {
    const token = await getToken();
    if (!isLoaded || !isSignedIn) {
      if (isLoaded) {
        setErrorAll("User not authenticated for all analyses");
      }
      setLoadingAll(false);
      return;
    }
    try {
      setLoadingAll(true);
      setErrorAll(null);
      if (!token) {
        if (isSignedIn) {
          console.warn(
            "Token not available but user is signed in. Retrying...."
          );
          setTimeout(fetchAllAnalyses, 500);
          return;
        }
        router.push("/sign-in");
        return;
      }
      const results = await fetchAllResumeAnalysis({ token });

      // Sort the results so that the most recent ones (by createdAt) come first
      const sortedResults = results.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setAllAnalysisData(sortedResults);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorAll(error.message || "Failed to load all analyses");
      } else {
        setErrorAll("Failed to load all analyses");
      }
    } finally {
      setLoadingAll(false);
    }
  }

  useEffect(() => {
    fetchAllAnalyses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  // --- State: Loading ---
  if (loadingAll) {
    return (
      <div className="w-full relative min-h-screen overflow-hidden pt-28">
        <div className="w-full px-4 relative z-10">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            </div>
            <p className="text-lg text-neutral-300 animate-pulse">
              Loading your analyses...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- State: Actual loading error (network failure, server error, etc.) ---
  if (errorAll) {
    return (
      <div className="w-full relative min-h-screen overflow-hidden pt-28">
        <div className="w-full px-4 relative z-10">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-red-400"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold mb-3 text-neutral-200">
              Something went wrong
            </p>
            <p className="text-sm text-neutral-400 max-w-md mb-6">
              We couldn&apos;t load your past analyses. This could be a temporary
              network issue — please try again.
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H4.598a.75.75 0 0 0-.75.75v3.634a.75.75 0 0 0 1.5 0v-2.134l.218.216a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.063-7.672a.75.75 0 0 0-1.5 0v2.134l-.218-.216A7 7 0 0 0 2.965 8.808a.75.75 0 0 0 1.449.39 5.5 5.5 0 0 1 9.201-2.466l.312.311H11.5a.75.75 0 0 0 0 1.5h3.634a.75.75 0 0 0 .75-.75V3.752Z"
                  clipRule="evenodd"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- State: No analyses yet (successful fetch, empty data) ---
  if (allAnalysisData.length === 0) {
    return (
      <div className="w-full relative min-h-screen overflow-hidden pt-28">
        <div className="w-full px-4 relative z-10">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-purple-500/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-purple-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                  clipRule="evenodd"
                />
                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
              </svg>
            </div>
            <p className="text-xl font-semibold mb-3 text-neutral-200">
              No analyses yet
            </p>
            <p className="text-sm text-neutral-400 max-w-md mb-6">
              You haven&apos;t analyzed any resumes yet. Upload your resume and a
              job description to get your first AI-powered analysis!
            </p>
            <Link
              href="/#upload"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              Start New Analysis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- State: Has data ---
  return (
    <div className="w-full relative min-h-screen overflow-hidden pt-28">
      <div className="w-full px-4 relative z-10">
        <LeftSidebar
          data={allAnalysisData}
          loadingAll={false}
          errorAll={null}
          onCardClick={handleCardClick}
          isResultPage
        />
      </div>
    </div>
  );
}
