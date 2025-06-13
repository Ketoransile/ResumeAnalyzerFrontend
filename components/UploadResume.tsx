"use client";

import DragAndDropUpload from "./DragAndDropUpload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { uploadResumeAndJobDescription } from "@/lib/uploadResumeAndJobDescription";
import { useAuth } from "@clerk/nextjs";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const formSchema = z.object({
  resumeFile: z
    .instanceof(File, { message: "Please upload a resume file." })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => file.name.toLowerCase().endsWith(".pdf"), {
      message: "Only PDF files are accepted",
    }),
  jobDescription: z.string().min(100, {
    message:
      "Job description cannot be empty and should be at least 100 characters.",
  }),
});
export interface ResponseData {
  _id: string;
  userId: string;
  resumeFileName: string;
  resumeCloudinaryUrl: string;
  jobDescriptionText: string;
  analysisDate: Date;

  // Ai generated analysis fieldss
  overall_fit_score: number;
  keyword_match_score: number;
  experience_relevance_score: number;
  top_matching_skills: string[];
  key_qualification_gaps: string[];
  actionable_enhancements: string[];
  tailored_summary_for_role: string;
  relevant_interview_questions: string[];
  potential_red_flags: string[];
  rawAIResponse?: unknown;
}
export default function UploadResume() {
  const { getToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeFile: undefined,
      jobDescription: "",
    },
  });
  const handleResumeFileUpload = (files: File[]) => {
    if (files.length > 0) {
      form.setValue("resumeFile", files[0]);
      form.trigger("resumeFile");
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken();
    if (!token) {
      router.push("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      const responseData: ResponseData = await uploadResumeAndJobDescription(
        token,
        values.resumeFile,
        values.jobDescription
      );

      form.reset();
      toast.success("Analysis is ready! Redirecting to your results.");

      router.push(`/result/${responseData?._id}`);
    } catch (error) {
      "Submission error:", error;
      const errorMessage =
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Failed to get result. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
        id="upload-resume-form"
      >
        <div className="w-full flex flex-col items-center justify-center gap-6 pb-20">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white  text-center z-10">
            Check Your Resume Score
          </h1>
          <h2 className="text-sm   text-center w-full px-4 md:w-2/3 lg:w-1/2 ">
            We will check your resume score based on the job description
          </h2>
          <div className=" h-auto md:w-2/3 flex flex-col items-center justify-center gap-10">
            <div className="w-full flex flex-col p-6 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="bg-white rounded-full text-black w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <h1>Upload Your Resume</h1>
              </div>

              <FormField
                control={form.control}
                name="resumeFile"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <DragAndDropUpload
                        onUploadComplete={handleResumeFileUpload}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="h-auto flex items-center gap-2 py-8">
                <span className="bg-white rounded-full text-black w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <h1>Add Job Description </h1>
              </div>

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="h-32 placeholder:text-neutral-500 p-2 border border-neutral-600"
                        placeholder="Copy and paste the job description here."
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white py-4 px-12 mt-8 text-black w-fit self-center hover:bg-neutral-400 cursor-pointer disabled:bg-neutral-400"
              >
                {isLoading ? (
                  <div className="flex gap-2 ">
                    <Loader2Icon className="animate-spin" />
                    <h1 className="text-sm">Please wait</h1>
                  </div>
                ) : (
                  "Get Result"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
