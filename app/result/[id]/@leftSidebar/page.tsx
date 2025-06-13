"use client";
import LeftSidebar from "@/components/LeftSidebar";
import { fetchAllResumeAnalysis } from "../fetchAllResumeAnalysis";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { IResumeAnalysisResult } from "../fetchResumeAnalysis";
export default function LeftSidebarPage() {
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
        setAllAnalysisData(results);
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message?: string }).message === "string"
        ) {
          setErrorAll(
            (error as { message: string }).message ||
              "Failed to load all analyses"
          );
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
    <LeftSidebar
      data={allAnalysisData}
      loadingAll={loadingAll}
      errorAll={errorAll}
      onCardClick={handleCardClick}
    />
  );
}
