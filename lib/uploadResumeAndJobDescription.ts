import { ResponseData } from "@/components/UploadResume";

export const uploadResumeAndJobDescription = async (
  token: string | null,
  resumeFile: File,
  jobDescription: string
): Promise<ResponseData> => {
  const formData = new FormData();

  formData.append("resume", resumeFile);
  formData.append("jobDescription", jobDescription);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
  try {
    const response = await fetch(`${baseUrl}/api/v1/resume/analyzeResume`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response object from uplad resumeand description ", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    const result = await response.json();
    console.log("analysis successfull:", result);
    return result;
  } catch (error: unknown) {
    console.error("Anlaysis Error:", error);
    throw error;
  }
};
