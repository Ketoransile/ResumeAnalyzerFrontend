export interface IResumeAnalysisResult {
  _id: string;
  userId: string;
  resumeFileName: string;
  resumeCloudinaryUrl: string;
  jobDescriptionText: string;
  overall_fit_score: number;
  keyword_match_score: number;
  experience_relevance_score: number;
  top_matching_skills: string[];
  key_qualification_gaps: string[];
  actionable_enhancements: string[];
  tailored_summary_for_role: string;
  relevant_interview_questions: string[];
  potential_red_flags: string[];
  rawAIResponse: object;
  analysisDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
const fetchResumeAnalysis = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<IResumeAnalysisResult> => {
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/resume/getSingleAnalysis/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(
        `Server returned an error: ${response.status} ${response.statusText}`
      );
    }
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text}`);
    }
    const parsed: IResumeAnalysisResult = await response.json();
    return parsed;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error while fetching analysis:", error.message);
      throw new Error(`Failed to fetch resume analysis: ${error.message}`);
    } else {
      console.error("Unknown error while fetching analysis:", error);
      throw new Error(
        "An unknown error occurred while fetching resume analysis."
      );
    }
  }
};

export default fetchResumeAnalysis;
