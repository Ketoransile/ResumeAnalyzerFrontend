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
import { ScoreItem } from "@/components/ScoreItem";
import { KeySkillsCard } from "@/components/KeySkillsCard";

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

        const result = await fetchResumeAnalysis({ id, token });

        setAnalysisData(result);
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response?: { status?: number } }).response ===
            "object" &&
          (error as { response?: { status?: number } }).response &&
          ((error as { response: { status: number } }).response.status ===
            403 ||
            (error as { response: { status: number } }).response.status === 404)
        ) {
          // If backend returns 403 or 404 for unauthorized access
          setError(
            "You do not have permission to view this analysis or it does not exist."
          );
          // Optional: redirect to a safe page if you want to prevent user from staying on this URL
          // router.push("/result");
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message?: string }).message === "string"
        ) {
          // For any other kind of error (e.g., network error, actual server bug)
          setError(
            (error as { message: string }).message ||
              "Failed to load analysis. Please try again."
          );
        } else {
          setError("Failed to load analysis. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysisData();
  }, [getToken, params, isLoaded, isSignedIn, router]);

  // const renderLeftSidebarContent = (
  //   title: string,
  //   data: IResumeAnalysisResult | null
  // ) => (
  //   <Accordion type="single" collapsible className="w-96">
  //     <AccordionItem
  //       value="item-1"
  //       className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-4"
  //     >
  //       <AccordionTrigger className="w-full  text-2xl">
  //         <p className="w-full font-bold text-sm">Previous Evaluations</p>
  //       </AccordionTrigger>
  //       {/* <AccordionContent className="w-full">
  //         <div className="w-fit flex flex-col gap-4">
  //           {loading ? (
  //             <p>Loading {title}...</p>
  //           ) : error ? (
  //             <p className="text-red-400">Error loading {title}.</p>
  //           ) : data ? (
  //             <>
  //               <div className="w-full flex flex-col gap-2 border p-4 border-neutral-700 rounded-xl">
  //                 <div className="w-full flex items-center justify-between">
  //                   <h1 className="text-sm">
  //                     {data.resumeFileName || "Untitled Resume"}
  //                   </h1>
  //                   <p>
  //                     {data.analysisDate
  //                       ? formatDate(data.analysisDate)
  //                       : "N/A"}
  //                   </p>
  //                 </div>
  //                 <p className="line-clamp-2">
  //                   {data.jobDescriptionText || "No job description provided."}
  //                 </p>
  //                 <div className="w-full flex items-center gap-4">
  //                   <span className="w-fit p-1 px-2 rounded-full bg-green-600">
  //                     Score {data.overall_fit_score}%
  //                   </span>
  //                   <span className="w-fit p-1 px-2 rounded-full bg-blue-600">
  //                     GPT-4.1
  //                   </span>
  //                 </div>
  //               </div>
  //             </>
  //           ) : (
  //             <p>No {title} data available.</p>
  //           )}
  //           <div className="border border-neutral-700 rounded-xl"></div>
  //         </div>
  //       </AccordionContent> */}
  //       <AccordionContent>
  //         <div className="flex flex-col gap-2">
  //           <ResumeAnalysisCard />
  //           <ResumeAnalysisCard />
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>
  //   </Accordion>
  // );
  // const renderLeftSidebarContent = (
  //   title, // e.g., "Previous Evaluations"
  //   data = {}, // An array of IResumeAnalysisResult objects
  //   loading, // boolean: true if data is being loaded
  //   error, // boolean: true if there was an error loading data
  //   onCardClick // Function to handle clicking on an individual analysis card
  // ) => (
  //   <Accordion type="single" collapsible className="w-96 min-h-full">
  //     <AccordionItem
  //       value="item-1"
  //       className="
  //       w-full
  //       bg-gradient-to-br from-neutral-900 to-neutral-800
  //       border border-neutral-700 rounded-2xl p-5
  //       shadow-xl shadow-neutral-950/50
  //     "
  //     >
  //       <AccordionTrigger
  //         className="
  //         flex items-center justify-between w-full
  //         text-xl font-bold text-neutral-100 cursor-pointer
  //         py-2
  //         group
  //       "
  //       >
  //         <span className="flex items-center gap-3">
  //           {/* Icon for Previous Evaluations */}
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 24 24"
  //             fill="currentColor"
  //             className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               d="M19.5 21a3 3 0 0 0 3-3V9a2.25 2.25 0 0 0-2.25-2.25H15V4.5a3 3 0 0 0-3-3h-2.25a3 3 0 0 0-3 3V6.75H4.5A2.25 2.25 0 0 0 2.25 9v9a3 3 0 0 0 3 3h14.25ZM12 2.25a.75.75 0 0 0-.75.75V6h-2.25a.75.75 0 0 0-.75.75V9H4.5A.75.75 0 0 1 3.75 9.75v6.75c0 .096.06.182.145.23L9 18.75V9.75A.75.75 0 0 1 9.75 9h5.25a.75.75 0 0 1 .75.75v9l5.105-2.77A.75.75 0 0 1 21.75 18V9.75A.75.75 0 0 1 21 9h-4.5V6.75a.75.75 0 0 0-.75-.75H13.5V3A.75.75 0 0 0 12 2.25Z"
  //               clipRule="evenodd"
  //             />
  //           </svg>
  //           <span className="group-hover:text-neutral-50 transition-colors">
  //             {title}
  //           </span>
  //         </span>
  //       </AccordionTrigger>

  //       <AccordionContent className="pt-4">
  //         <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2">
  //           {/* Custom Scrollbar Styling for dark theme */}
  //           <style jsx>{`
  //             .overflow-y-auto::-webkit-scrollbar {
  //               width: 8px;
  //             }
  //             .overflow-y-auto::-webkit-scrollbar-track {
  //               background: #2a2a2a; /* neutral-800 */
  //               border-radius: 10px;
  //             }
  //             .overflow-y-auto::-webkit-scrollbar-thumb {
  //               background: #525252; /* neutral-600 */
  //               border-radius: 10px;
  //             }
  //             .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  //               background: #737373; /* neutral-500 */
  //             }
  //           `}</style>

  //           {loading ? (
  //             <p className="text-neutral-400 text-center py-4">
  //               Loading previous evaluations...
  //             </p>
  //           ) : error ? (
  //             <p className="text-red-400 text-center py-4">
  //               Error loading evaluations. Please try again.
  //             </p>
  //           ) : data && data.length > 0 ? (
  //             data.map((item, index) => (
  //               <ResumeAnalysisCard
  //                 key={item.id || index} // Use a unique ID for the key if available
  //                 analysisData={item}
  //                 onClick={() => onCardClick(item)} // Pass the item to the click handler
  //               />
  //             ))
  //           ) : (
  //             <div className="text-center py-6 text-neutral-400">
  //               <p className="mb-2">No previous evaluations found.</p>
  //               <p className="text-sm">
  //                 Upload a resume and job description to get started!
  //               </p>
  //             </div>
  //           )}
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>
  //   </Accordion>
  // );

  return (
    <div>
      {loading || (!isLoaded && !error && !isSignedIn) ? ( // Added !isSignedIn to ensure loading state is accurate before redirect
        <div className="text-center text-white">Loading analysis...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg p-8">
          {/* Display the more specific error message from state */}
          <p className="mb-2">{error}</p>
          {error ===
            "You do not have permission to view this analysis or it does not exist." && (
            <p className="text-sm text-neutral-400">
              Please check the URL or select an analysis from your history.
            </p>
          )}
        </div>
      ) : !analysisData ? (
        <div className="text-center text-neutral-400 text-lg p-8">
          No analysis data found for this ID. This might be due to an invalid ID
          or a deleted analysis.
        </div>
      ) : (
        <Accordion
          type="multiple"
          className="w-full flex flex-col gap-4"
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
          <AccordionItem
            value="item-1"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351A.75.75 0 0 1 12 22.5c.197 0 .38-.079.54-.201l9-7.5a.75.75 0 0 0 0-1.192l-9-7.5A.75.75 0 0 1 12 5.25c.197 0 .38.079.54.201l9 7.5c.34.283.67.563 1 .839V6a2.25 2.25 0 0 0-2.25-2.25H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15.75c.22 0 .432-.014.64-.044a.75.75 0 0 1-.064-.047l-9-7.5A.75.75 0 0 0 11.54 22.351Zm-.614-10.472a.75.75 0 0 0 0-1.059L3.75 6.75v8.498l7.176-5.999Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="group-hover:text-neutral-50 transition-colors">
                  Overall Suitability Score
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              <div
                className="
        bg-neutral-800/60 border border-neutral-700
        rounded-xl p-5
        shadow-inner shadow-neutral-950/20
        flex flex-col items-center justify-center gap-6
      "
              >
                <ScoreItem
                  title="Overall Match"
                  value={analysisData.overall_fit_score.toString()}
                  isLarge={true}
                />

                <p className="text-center text-neutral-300 text-lg max-w-lg mb-4">
                  This score indicates the comprehensive alignment of your
                  profile with the job description, considering all key analysis
                  areas.
                </p>

                {/* Conditional feedback message based on overall score */}
                {analysisData.overall_fit_score < 60 && (
                  <div
                    className="
            w-full bg-red-900/10 border border-red-700/50 rounded-lg p-3 text-red-300 text-center
            shadow-inner shadow-red-950/20
          "
                  >
                    <p className="text-base font-semibold">
                      Your profile needs significant tailoring. Focus on
                      improving skill matches and experience relevance.
                    </p>
                  </div>
                )}

                {analysisData.overall_fit_score >= 60 &&
                  analysisData.overall_fit_score < 80 && (
                    <div
                      className="
              w-full bg-amber-900/10 border border-amber-700/50 rounded-lg p-3 text-amber-300 text-center
              shadow-inner shadow-amber-950/20
            "
                    >
                      <p className="text-base font-semibold">
                        A solid start! Review the detailed sections to further
                        optimize your profile.
                      </p>
                    </div>
                  )}

                {analysisData.overall_fit_score >= 80 && (
                  <div
                    className="
            w-full bg-green-900/10 border border-green-700/50 rounded-lg p-3 text-green-300 text-center
            shadow-inner shadow-green-950/20
          "
                  >
                    <p className="text-base font-semibold">
                      Excellent fit! Your profile is highly aligned with this
                      job description.
                    </p>
                  </div>
                )}

                {/* Individual Score Breakdown */}
                <div className="mt-6 pt-4 border-t border-neutral-700/50 w-full">
                  <h3 className="text-lg font-semibold text-neutral-200 mb-4 text-center">
                    Breakdown of Key Scores:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ScoreItem
                      title="Keyword Match"
                      value={analysisData.keyword_match_score.toString()}
                      isLarge={false}
                    />
                    <ScoreItem
                      title="Experience Relevance"
                      value={analysisData.experience_relevance_score.toString()}
                      isLarge={false}
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-lime-400 group-hover:text-lime-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.078 2.25c-.917 0-1.802.203-2.603.58l-.132.06M4.992 4.743A9.752 9.752 0 0 0 2.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75c0-1.06-.172-2.072-.499-3.037m-9.75 0a.75.75 0 0 1 .028-.028L12 2.25l3.659 3.659c.105.105.184.232.238.366M12 10.5a.75.75 0 0 0-.75.75v.75H9.75a.75.75 0 0 0 0 1.5h1.5v.75a.75.75 0 0 0 1.5 0v-.75h.75a.75.75 0 0 0 0-1.5h-.75v-.75a.75.75 0 0 0-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="group-hover:text-neutral-50 transition-colors">
                  Keyword Match Score
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              <div
                className="
        bg-neutral-800/60 border border-neutral-700
        rounded-xl p-5
        shadow-inner shadow-neutral-950/20
        flex flex-col items-center justify-center gap-4
      "
              >
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-8 border-neutral-700"></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      // Dynamic color based on score:
                      borderColor:
                        analysisData.keyword_match_score >= 80
                          ? "rgb(163 230 53 / var(--tw-border-opacity))" /* lime-400 */
                          : analysisData.keyword_match_score >= 50
                          ? "rgb(251 191 36 / var(--tw-border-opacity))" /* amber-400 */
                          : "rgb(252 165 165 / var(--tw-border-opacity))" /* red-300 */,
                      borderLeftColor: "transparent",
                      borderTopColor: "transparent",
                      transform: `rotate(${
                        (analysisData.keyword_match_score / 100) * 360 + 90
                      }deg)`,
                      transformOrigin: "center",
                      transition: "transform 1s ease-out",
                    }}
                  ></div>
                  <p className="text-5xl font-extrabold text-lime-400 drop-shadow-lg">
                    {analysisData.keyword_match_score}%
                  </p>
                </div>

                <p className="text-center text-neutral-300 text-lg max-w-md">
                  This score reflects the percentage of key terms and skills
                  from the job description found directly in your resume.
                </p>

                {analysisData.keyword_match_score < 70 && (
                  <div
                    className="
            mt-3 w-full bg-red-900/10 border border-red-700/50 rounded-lg p-3 text-red-300 text-center
            shadow-inner shadow-red-950/20
          "
                  >
                    <p className="text-sm">
                      **Action Needed!** Your resume might be missing key terms.
                      Incorporate more direct keywords from the job description.
                    </p>
                  </div>
                )}

                {analysisData.keyword_match_score >= 70 &&
                  analysisData.keyword_match_score < 90 && (
                    <div
                      className="
            mt-3 w-full bg-amber-900/10 border border-amber-700/50 rounded-lg p-3 text-amber-300 text-center
            shadow-inner shadow-amber-950/20
          "
                    >
                      <p className="text-sm">
                        Good match! You can further improve by subtly weaving in
                        more exact keywords from the job description.
                      </p>
                    </div>
                  )}

                {analysisData.keyword_match_score >= 90 && (
                  <div
                    className="
            mt-3 w-full bg-green-900/10 border border-green-700/50 rounded-lg p-3 text-green-300 text-center
            shadow-inner shadow-green-950/20
          "
                  >
                    <p className="text-sm">
                      Fantastic! Your resume is highly optimized for keywords,
                      which is great for ATS.
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-teal-400 group-hover:text-teal-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6 6 0 0 0-5.657 4.306 2.25 2.25 0 0 1 1.047 1.51l.885 3.011a1.5 1.5 0 0 1-.606 1.834c-.47.279-.982.437-1.5.465V18a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75v-1.5h.75a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.442-.684L12 9.75l1.995 1.11a.75.75 0 0 0-.442.684v1.5a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75v-1.5c0-.028-.53-.186-1.0-.465a1.5 1.5 0 0 1-.606-1.834l.885-3.011a2.25 2.25 0 0 1 1.047-1.51A6 6 0 0 0 13.5 3.75h-3Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="group-hover:text-neutral-50 transition-colors">
                  Experience Relevance Score
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              <div
                className="
        bg-neutral-800/60 border border-neutral-700
        rounded-xl p-5
        shadow-inner shadow-neutral-950/20
        flex flex-col items-center justify-center gap-4
      "
              >
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-8 border-neutral-700"></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      // Dynamic color based on score:
                      borderColor:
                        analysisData.experience_relevance_score >= 80
                          ? "rgb(52 211 153 / var(--tw-border-opacity))" /* teal-400 */
                          : analysisData.experience_relevance_score >= 50
                          ? "rgb(251 191 36 / var(--tw-border-opacity))" /* amber-400 */
                          : "rgb(252 165 165 / var(--tw-border-opacity))" /* red-300 */,
                      borderLeftColor: "transparent",
                      borderTopColor: "transparent",
                      transform: `rotate(${
                        (analysisData.experience_relevance_score / 100) * 360 +
                        90
                      }deg)`, // Rotate to fill based on percentage
                      transformOrigin: "center",
                      transition: "transform 1s ease-out", // Smooth animation
                    }}
                  ></div>
                  <p className="text-5xl font-extrabold text-teal-400 drop-shadow-lg">
                    {analysisData.experience_relevance_score}%
                  </p>
                </div>

                <p className="text-center text-neutral-300 text-lg max-w-md">
                  This score assesses how well your past work history aligns
                  with the required experience in the job description.
                </p>

                {analysisData.experience_relevance_score < 75 && (
                  <div
                    className="
            mt-3 w-full bg-red-900/10 border border-red-700/50 rounded-lg p-3 text-red-300 text-center
            shadow-inner shadow-red-950/20
          "
                  >
                    <p className="text-sm">
                      Consider tailoring your experience descriptions to better
                      highlight relevant achievements for this role.
                    </p>
                  </div>
                )}

                {analysisData.experience_relevance_score >= 75 && (
                  <div
                    className="
            mt-3 w-full bg-green-900/10 border border-green-700/50 rounded-lg p-3 text-green-300 text-center
            shadow-inner shadow-green-950/20
          "
                  >
                    <p className="text-sm">
                      Excellent! Your experience strongly aligns with the job
                      requirements.
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.952 1.493A1 1 0 0 0 19 1H5a1 1 0 0 0-.952.493L1.134 9h21.732l-2.814-7.507ZM3.62 10.5H20.38l-1.46 3.9C18.52 15.655 16.7 17 14.5 17H9.5c-2.209 0-4.02-1.345-4.42-3.6L3.62 10.5ZM13.5 17a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2ZM7.5 17a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2ZM6 20.5a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1H6Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="group-hover:text-neutral-50 transition-colors">
                  Your Matched Skills
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              {analysisData.top_matching_skills.length > 0 ? (
                <div
                  className="
          bg-neutral-800/60 border border-neutral-700
          rounded-xl p-4
          shadow-inner shadow-neutral-950/20
        "
                >
                  <p className="text-neutral-300 mb-3 font-semibold text-lg">
                    These key skills from your profile match the job
                    description:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {analysisData.top_matching_skills.map((skill, index) => (
                      <KeySkillsCard title={skill} key={index} />
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-700/50">
                    <p className="text-neutral-400 text-sm">
                      Showcase these skills prominently in your application to
                      stand out!
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="
          flex flex-col items-center gap-4
          bg-gradient-to-br from-blue-900/30 to-blue-900/10
          border border-blue-700 rounded-xl p-6
          shadow-md shadow-blue-950/20
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-blue-400 animate-pulse-once"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.212a.75.75 0 0 0-1.076 0L2.212 10.79a.75.75 0 0 0 0 1.06L9.728 19.79a.75.75 0 0 0 1.076 0l7.516-7.517a.75.75 0 0 0 0-1.06L10.788 3.212Zm0 0L19.5 12l-7.516 7.517L3 12l7.788-7.788Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-xl font-semibold text-blue-300 text-center">
                    No direct skill matches found yet.
                  </p>
                  <p className="text-neutral-400 text-center max-w-md">
                    Consider tailoring your profile or resume more closely to
                    the job description to highlight relevant abilities.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-yellow-400 group-hover:text-yellow-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2.056 4.043-2.056 5.198 0 .691 1.22 1.787 2.043 3.118 2.684 1.723.82 2.9 2.45 2.9 4.24V14a.75.75 0 0 1-.75.75H18a2.25 2.25 0 0 0-2.25 2.25v.375c0 .621.504 1.125 1.125 1.125h1.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75H18a2.25 2.25 0 0 0-2.25 2.25V21a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-.375c0-.621-.504-1.125-1.125-1.125h-1.5a.75.75 0 0 1-.75-.75v-.75a.75.75 0 0 1 .75-.75h.375c.621 0 1.125-.504 1.125-1.125V16.5A2.25 2.25 0 0 0 12 14.25h-.25a.75.75 0 0 1-.75-.75V10.5a.75.75 0 0 1 .75-.75h.25c.621 0 1.125-.504 1.125-1.125V7.5A2.25 2.25 0 0 0 9.75 5.25H9.401ZM12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="group-hover:text-neutral-50 transition-colors">
                  Skill Gaps & Opportunities
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              {analysisData.key_qualification_gaps.length > 0 ? (
                <div
                  className="
          bg-neutral-800/60 border border-neutral-700
          rounded-xl p-4
          shadow-inner shadow-neutral-950/20
        "
                >
                  <p className="text-neutral-300 mb-3 font-semibold text-lg">
                    Potential areas for growth based on job market trends:
                  </p>
                  <ul className="space-y-3">
                    {analysisData.key_qualification_gaps.map((gap, index) => (
                      <li
                        key={index}
                        className="
                flex items-start gap-3
                bg-red-900/20 text-red-300
                rounded-lg px-4 py-3
                border border-red-700/50
                shadow-md shadow-red-950/20
                hover:bg-red-900/30 transition-colors
              "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2.056 4.043-2.056 5.198 0 .691 1.22 1.787 2.043 3.118 2.684 1.723.82 2.9 2.45 2.9 4.24V14a.75.75 0 0 1-.75.75H18a2.25 2.25 0 0 0-2.25 2.25v.375c0 .621.504 1.125 1.125 1.125h1.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75H18a2.25 2.25 0 0 0-2.25 2.25V21a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-.375c0-.621-.504-1.125-1.125-1.125h-1.5a.75.75 0 0 1-.75-.75v-.75a.75.75 0 0 1 .75-.75h.375c.621 0 1.125-.504 1.125-1.125V16.5A2.25 2.25 0 0 0 12 14.25h-.25a.75.75 0 0 1-.75-.75V10.5a.75.75 0 0 1 .75-.75h.25c.621 0 1.125-.504 1.125-1.125V7.5A2.25 2.25 0 0 0 9.75 5.25H9.401Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-base leading-snug">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div
                  className="
          flex flex-col items-center gap-4
          bg-gradient-to-br from-green-900/30 to-green-900/10
          border border-green-700 rounded-xl p-6
          shadow-md shadow-green-950/20
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-green-400 animate-bounce-once"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.893a.75.75 0 0 0-1.061-1.061l-3.045 3.044-1.797-1.797a.75.75 0 0 0-1.061 1.06L11.02 14.03a.75.75 0 0 0 1.06 0l3.98-3.98Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-xl font-semibold text-green-300 text-center">
                    Fantastic! No significant skill gaps identified.
                  </p>
                  <p className="text-neutral-400 text-center max-w-md">
                    Your current qualifications align well with market demands.
                    Keep up the great work!
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-6"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06L11.5 9.81v6.19a.75.75 0 0 0 1.5 0V9.81l1.97 1.97a.75.75 0 1 0 1.06-1.06l-3-3Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="group-hover:text-neutral-50 transition-colors">
                  Actionable Recommendations
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              {analysisData.actionable_enhancements.length > 0 ? (
                <div
                  className="
          bg-neutral-800/60 border border-neutral-700
          rounded-xl p-4
          shadow-inner shadow-neutral-950/20
        "
                >
                  <p className="text-neutral-300 mb-3 font-semibold text-lg">
                    Consider these steps to boost your profile and application:
                  </p>
                  <ul className="space-y-3">
                    {analysisData.actionable_enhancements.map(
                      (enhancement, index) => (
                        <li
                          key={index}
                          className="
                flex items-start gap-3
                bg-cyan-900/20 text-cyan-300
                rounded-lg px-4 py-3
                border border-cyan-700/50
                shadow-md shadow-cyan-950/20
                hover:bg-cyan-900/30 transition-colors
              "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 5.653c0-1.427 1.529-2.367 2.834-1.664l11.523 6.073a1.125 1.125 0 0 1 0 2.006l-11.523 6.073C6.029 20.71 4.5 19.77 4.5 18.346V5.653Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-base leading-snug">
                            {enhancement}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <div
                  className="
          flex flex-col items-center gap-4
          bg-gradient-to-br from-green-900/30 to-green-900/10
          border border-green-700 rounded-xl p-6
          shadow-md shadow-green-950/20
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-green-400 animate-bounce-once"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.893a.75.75 0 0 0-1.061-1.061l-3.045 3.044-1.797-1.797a.75.75 0 0 0-1.061 1.06L11.02 14.03a.75.75 0 0 0 1.06 0l3.98-3.98Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-xl font-semibold text-green-300 text-center">
                    Excellent! Your profile is well-optimized.
                  </p>
                  <p className="text-neutral-400 text-center max-w-md">
                    No immediate enhancements detected based on the analysis.
                    Keep shining!
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-7"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="group-hover:text-neutral-50 transition-colors">
                  Your Tailored Profile Summary
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              <div
                className="
        bg-neutral-800/60 border border-neutral-700
        rounded-xl p-5
        shadow-inner shadow-neutral-950/20
        text-lg leading-relaxed text-neutral-200
      "
              >
                {analysisData.tailored_summary_for_role ? (
                  <p>{analysisData.tailored_summary_for_role}</p>
                ) : (
                  <p className="text-neutral-400 italic">
                    No tailored summary available yet. Please provide more
                    details or select a job description for analysis.
                  </p>
                )}
              </div>

              {analysisData.tailored_summary_for_role && (
                <div className="mt-4 pt-4 border-t border-neutral-700/50 flex flex-wrap gap-3">
                  <button
                    className="
            bg-gradient-to-r from-purple-600 to-fuchsia-600
            text-white font-semibold py-2.5 px-5
            rounded-full shadow-lg hover:shadow-xl
            transition-all duration-300 transform
            hover:scale-105 hover:from-purple-700 hover:to-fuchsia-700
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75
          "
                  >
                    Copy Summary
                  </button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-8"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3-1.5a1.5 1.5 0 0 0-1.5 1.5v12c0 .828.672 1.5 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H5.25Z"
                    clipRule="evenodd"
                  />
                  <path d="M13.877 15.36c-1.396.697-3.03.697-4.426 0a.75.75 0 0 0-.29.845 9.774 9.774 0 0 0 4.796 3.113.75.75 0 0 0 .29 0 9.774 9.774 0 0 0 4.796-3.113.75.75 0 0 0-.29-.845Z" />
                </svg>
                <span className="group-hover:text-neutral-50 transition-colors">
                  Relevant Interview Questions
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              {analysisData.relevant_interview_questions.length > 0 ? (
                <div
                  className="
          bg-neutral-800/60 border border-neutral-700
          rounded-xl p-4
          shadow-inner shadow-neutral-950/20
        "
                >
                  <p className="text-neutral-300 mb-3 font-semibold text-lg">
                    Practice these questions to prepare for your interviews:
                  </p>
                  <ul className="space-y-4">
                    {analysisData.relevant_interview_questions.map(
                      (question, index) => (
                        <li
                          key={index}
                          className="
                flex items-start gap-3
                bg-indigo-900/20 text-indigo-300
                rounded-lg px-4 py-3
                border border-indigo-700/50
                shadow-md shadow-indigo-950/20
                hover:bg-indigo-900/30 transition-colors
                text-base leading-snug
              "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.973 6.977a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.22-1.22H6a.75.75 0 0 1 0-1.5h4.193l-1.22-1.22a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">{question}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <div
                  className="
          flex flex-col items-center gap-4
          bg-gradient-to-br from-neutral-800/60 to-neutral-800/30
          border border-neutral-700 rounded-xl p-6
          shadow-md shadow-neutral-950/20
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-neutral-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.337 21.43c.944 1.127 2.227 1.8 3.593 1.8 1.488 0 2.902-.68 3.99-1.802A.75.75 0 0 0 12 20.25h-1.5v-2.25c0-.621.504-1.125 1.125-1.125H15a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 13.5 10.5v-.375C13.5 9.404 12.996 8.9 12.375 8.9H9.75a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 1 .75-.75h.375c.621 0 1.125-.504 1.125-1.125V4.5A2.25 2.25 0 0 0 9.75 2.25h-.375a.75.75 0 0 0-.75.75V3c0 .828-.672 1.5-1.5 1.5h-1.5A.75.75 0 0 1 4.5 3V2.25a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v1.5c0 .621.504 1.125 1.125 1.125H4.5A.75.75 0 0 1 5.25 6h-.375c-.621 0-1.125.504-1.125 1.125V8.25a.75.75 0 0 0 .75.75H5.25a.75.75 0 0 1 .75.75v2.25c0 .621-.504 1.125-1.125 1.125H3a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 .75.75H3a2.25 2.25 0 0 1 2.25 2.25v.375c0 .621.504 1.125 1.125 1.125H8.25a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-.75-.75H5.25a.75.75 0 0 1-.75-.75v-1.5c0-.621.504-1.125 1.125-1.125H6.75a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H6a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 .75.75H4.5c.621 0 1.125-.504 1.125-1.125V17.25c0-.828-.672-1.5-1.5-1.5H3.75a.75.75 0 0 0-.75.75v1.5A.75.75 0 0 0 3.75 19.5h1.5a.75.75 0 0 0 .087-1.42Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xl font-semibold text-neutral-300 text-center">
                    No specific interview questions generated.
                  </p>
                  <p className="text-neutral-400 text-center max-w-md">
                    Please provide more details or a job description to generate
                    relevant questions.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-9"
            className="
    bg-gradient-to-br from-neutral-900 to-neutral-800
    border border-neutral-700 rounded-2xl p-5
    shadow-xl shadow-neutral-950/50
    transition-all duration-300 ease-in-out
    hover:border-neutral-600
  "
          >
            <AccordionTrigger
              className="
      flex items-center justify-between w-full
      text-xl font-bold text-neutral-100 cursor-pointer
      py-2
      group
    "
            >
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2.056 4.043-2.056 5.198 0 .691 1.22 1.787 2.043 3.118 2.684 1.723.82 2.9 2.45 2.9 4.24V14a.75.75 0 0 1-.75.75H18a2.25 2.25 0 0 0-2.25 2.25v.375c0 .621.504 1.125 1.125 1.125h1.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75H18a2.25 2.25 0 0 0-2.25 2.25V21a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-.375c0-.621-.504-1.125-1.125-1.125h-1.5a.75.75 0 0 1-.75-.75v-.75a.75.75 0 0 1 .75-.75h.375c.621 0 1.125-.504 1.125-1.125V16.5A2.25 2.25 0 0 0 12 14.25h-.25a.75.75 0 0 1-.75-.75V10.5a.75.75 0 0 1 .75-.75h.25c.621 0 1.125-.504 1.125-1.125V7.5A2.25 2.25 0 0 0 9.75 5.25H9.401ZM12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="group-hover:text-neutral-50 transition-colors">
                  Potential Red Flags
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className="
      flex flex-col gap-4 pt-4
      text-neutral-300
    "
            >
              {analysisData.potential_red_flags.length > 0 ? (
                <div
                  className="
          bg-neutral-800/60 border border-neutral-700
          rounded-xl p-4
          shadow-inner shadow-neutral-950/20
        "
                >
                  <p className="text-neutral-300 mb-3 font-semibold text-lg">
                    Please review these points in your profile:
                  </p>
                  <ul className="space-y-4">
                    {analysisData.potential_red_flags.map((flag, index) => (
                      <li
                        key={index}
                        className="
                flex items-start gap-3
                bg-amber-900/20 text-amber-300
                rounded-lg px-4 py-3
                border border-amber-700/50
                shadow-md shadow-amber-950/20
                hover:bg-amber-900/30 transition-colors
                text-base leading-snug
              "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.485 2.495c.673-1.166 2.307-1.166 2.98 0l5.504 9.5a1.5 1.5 0 0 1-1.299 2.25H3.28a1.5 1.5 0 0 1-1.299-2.25l5.504-9.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">{flag}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-neutral-700/50">
                    <p className="text-neutral-400 text-sm mb-3">
                      It&apos;s recommended to address these points before
                      applying.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="
                bg-gradient-to-r from-orange-600 to-amber-600
                text-white font-semibold py-2.5 px-5
                rounded-full shadow-lg hover:shadow-xl
                transition-all duration-300 transform
                hover:scale-105 hover:from-orange-700 hover:to-amber-700
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75
              "
                      >
                        Review My Profile
                      </button>
                      <button
                        className="
                bg-neutral-700 text-neutral-200 font-semibold py-2.5 px-5
                rounded-full border border-neutral-600
                shadow-md hover:bg-neutral-600 hover:text-white
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-75
              "
                      >
                        Get Expert Advice
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="
          flex flex-col items-center gap-4
          bg-gradient-to-br from-green-900/30 to-green-900/10
          border border-green-700 rounded-xl p-6
          shadow-md shadow-green-950/20
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-green-400 animate-bounce-once"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.893a.75.75 0 0 0-1.061-1.061l-3.045 3.044-1.797-1.797a.75.75 0 0 0-1.061 1.06L11.02 14.03a.75.75 0 0 0 1.06 0l3.98-3.98Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-xl font-semibold text-green-300 text-center">
                    Great job! No significant red flags detected.
                  </p>
                  <p className="text-neutral-400 text-center max-w-md">
                    Your profile appears clear and ready for review.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
