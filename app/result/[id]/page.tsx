"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import fetchResumeAnalysis, {
  IResumeAnalysisResult,
} from "./fetchResumeAnalysis";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DashboardLayout from "./layout";
export default function ResumeAnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();

  const [analysisData, setAnalysisData] =
    useState<IResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalysisData() {
      const { id } = await params;
      const token = await getToken();

      if (!isLoaded || !isSignedIn) {
        if (isLoaded) {
          setError("User not authenticated.");
        }
        setLoading(false);
        return;
      }
      if (!id) {
        setError("Analysis ID not provided in URL.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        if (!token) {
          router.push("/sign-in");
          return;
        }

        console.log("id from resuls/id page is", id);
        console.log("token from result/id page is ", token);
        const result = await fetchResumeAnalysis({ id, token });
        console.log("Result from /result/id page", result);
        setAnalysisData(result);
      } catch (error: any) {
        console.error("Error while fetching analysis data", error);
        setError(error.message || "Failed to load analysis");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysisData();
  }, [getToken, params, isLoaded, isSignedIn, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const renderSidebarContent = (
    title: string,
    data: IResumeAnalysisResult | null,
    isLeft: boolean = true
  ) => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem
        value="item-1"
        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-4"
      >
        <AccordionTrigger className="w-full">{title}</AccordionTrigger>
        <AccordionContent className="w-full">
          <div className="w-fit flex flex-col gap-4">
            {loading ? (
              <p>Loading {title}...</p>
            ) : error ? (
              <p className="text-red-400">Error loading {title}.</p>
            ) : data ? (
              <div className="w-full flex flex-col gap-2 border p-4 border-neutral-700 rounded-xl">
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-sm">
                    {data.resumeFileName || "Untitled Resume"}
                  </h1>
                  <p>
                    {data.analysisDate ? formatDate(data.analysisDate) : "N/A"}
                  </p>
                </div>
                <p className="line-clamp-2">
                  {data.jobDescriptionText || "No job description provided."}
                </p>
                <div className="w-full flex items-center gap-4">
                  <span className="w-fit p-1 px-2 rounded-full bg-green-600">
                    Score {data.overall_fit_score}%
                  </span>
                  <span className="w-fit p-1 px-2 rounded-full bg-blue-600">
                    GPT-4.1
                  </span>
                </div>
              </div>
            ) : (
              <p>No {title} data available.</p>
            )}
            {/* You can add more dynamic content here, e.g., a list of past analyses */}
            <div className="border border-neutral-700 rounded-xl"></div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <DashboardLayout
      leftSidebar={renderSidebarContent(
        "Previously Analyzed Resumes",
        analysisData,
        true
      )}
      rightSidebar={renderSidebarContent(
        "Other Info/Tools",
        analysisData,
        false
      )} // Example for right sidebar
    >
      {loading || (!isLoaded && !error) ? (
        <div className="text-center text-white">Loading analysis...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : !analysisData ? (
        <div className="text-center text-neutral-400">
          No analysis data found for this ID.
        </div>
      ) : (
        <Accordion
          type="multiple"
          className=" flex flex-col gap-4"
          defaultValue={[
            "item-1",
            "item-2",
            "item-3",
            "item-4",
            "item-5",
            "item-6",
            "item-7",
            "item-8",
            "item-9",
          ]}
        >
          {/* Overall Suitability Score */}
          <AccordionItem
            value="item-1"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Overall Suitability Score</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-xl font-bold">
                {analysisData.overall_fit_score}% Match
              </p>
              <p>
                This score indicates the comprehensive alignment of your resume
                with the job description.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Keyword Match Score */}
          <AccordionItem
            value="item-2"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Keyword Match Score</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-xl font-bold">
                {analysisData.keyword_match_score}% Keyword Match
              </p>
              <p>
                This score reflects the percentage of key terms and skills from
                the job description found directly in your resume.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Experience Relevance Score */}
          <AccordionItem
            value="item-3"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Experience Relevance Score</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-xl font-bold">
                {analysisData.experience_relevance_score}% Experience Relevance
              </p>
              <p>
                This score assesses how well your past work history aligns with
                the required experience in the job description.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Key Skills Found */}
          <AccordionItem
            value="item-4"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Key Skills Found</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {analysisData.top_matching_skills.length > 0 ? (
                <ul className="list-disc pl-5">
                  {analysisData.top_matching_skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  No key matching skills identified based on the job
                  description.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Missing Keywords/Skills */}
          <AccordionItem
            value="item-5"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Missing Keywords/Skills</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {analysisData.key_qualification_gaps.length > 0 ? (
                <ul className="list-disc pl-5">
                  {analysisData.key_qualification_gaps.map((gap, index) => (
                    <li key={index} className="text-red-300">
                      {gap}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  No significant missing keywords or qualification gaps
                  identified!
                </p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Actionable Enhancements */}
          <AccordionItem
            value="item-6"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Actionable Enhancements</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {analysisData.actionable_enhancements.length > 0 ? (
                <ul className="list-disc pl-5">
                  {analysisData.actionable_enhancements.map(
                    (enhancement, index) => (
                      <li key={index}>{enhancement}</li>
                    )
                  )}
                </ul>
              ) : (
                <p>No specific enhancements suggested for this resume.</p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Tailored Summary */}
          <AccordionItem
            value="item-7"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Tailored Profile Summary</AccordionTrigger>
            <AccordionContent>
              <p>{analysisData.tailored_summary_for_role}</p>
            </AccordionContent>
          </AccordionItem>

          {/* Relevant Interview Questions */}
          <AccordionItem
            value="item-8"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Relevant Interview Questions</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {analysisData.relevant_interview_questions.length > 0 ? (
                <ul className="list-disc pl-5">
                  {analysisData.relevant_interview_questions.map(
                    (question, index) => (
                      <li key={index}>{question}</li>
                    )
                  )}
                </ul>
              ) : (
                <p>No specific interview questions generated.</p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Potential Red Flags */}
          <AccordionItem
            value="item-9"
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <AccordionTrigger>Potential Red Flags</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {analysisData.potential_red_flags.length > 0 ? (
                <ul className="list-disc pl-5">
                  {analysisData.potential_red_flags.map((flag, index) => (
                    <li key={index} className="text-orange-400">
                      {flag}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No significant red flags identified in the resume.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </DashboardLayout>
  );
}
