import { IResumeAnalysisResult } from "./fetchResumeAnalysis";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

interface BackendAllAnalysisResponse {
  success: boolean;
  message: string;
  data: IResumeAnalysisResult[];
}
interface ErrorResponse {
  message?: string;
  [key: string]: unknown; // Optional: to allow other unexpected fields
}
export const fetchAllResumeAnalysis = async ({
  token,
}: {
  token: string;
}): Promise<IResumeAnalysisResult[]> => {
  try {
    console.log("TOken from fetchALlAnalysis is ", token);
    const response = await fetch(`${baseUrl}/api/v1/resume/getAllAnalyses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(
      "Response object from fetchAllResumeAnalysis function is",
      response
    );
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      let errorData: ErrorResponse | string;
      if (contentType?.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
      console.error("Error response body: ", errorData);
      throw new Error(
        (typeof errorData === "object" &&
        errorData !== null &&
        "message" in errorData &&
        typeof (errorData as ErrorResponse).message === "string"
          ? (errorData as ErrorResponse).message
          : typeof errorData === "string"
          ? errorData
          : undefined) ||
          `Server returned an error: ${response.status} ${response.statusText}`
      );
    }
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      throw new Error(
        `Unexpected response format: Expected JSON, but received: ${text}`
      );
    }
    const fullResponse: BackendAllAnalysisResponse = await response.json();
    console.log("Parsed all resume result is ", fullResponse);
    if (!fullResponse.success) {
      throw new Error(
        fullResponse.message || "Backend reported an unsuccessful operation."
      );
    }
    return fullResponse.data;
  } catch (error) {
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

export default fetchAllResumeAnalysis;
