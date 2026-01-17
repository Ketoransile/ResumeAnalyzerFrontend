"use client";
import LeftSidebar from "@/components/LeftSidebar";

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
  useEffect(() => {
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
              "TOken not available but user is signed in. Retrying...."
            );
            setTimeout(fetchAllAnalyses, 500);
            return;
          }
          router.push("/sign-in");
          return;
        }
        // console.log("Fetching all analyses with token: ", token);
        const results = await fetchAllResumeAnalysis({ token });
        // console.log("All analyses fetched: ", results);

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
    fetchAllAnalyses();
  }, [getToken, isLoaded, isSignedIn, router]);
  return (
    <div className="w-full relative min-h-screen overflow-hidden pt-28">

      <div className="w-full px-4 relative z-10">
        {errorAll ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center text-neutral-400">
            <p className="text-xl font-semibold mb-4">
              No analysis history found.
            </p>
            <p className="text-sm">
              There was an issue loading your past analyses. Please ensure you are
              logged in or try again later.
            </p>
          </div>
        ) : (
          <LeftSidebar
            data={allAnalysisData}
            loadingAll={loadingAll}
            errorAll={errorAll}
            onCardClick={handleCardClick}
            isResultPage
          />
        )}
      </div>
    </div>
  );
}
