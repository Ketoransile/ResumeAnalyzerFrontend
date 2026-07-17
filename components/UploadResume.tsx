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
        <div id="upload" className="w-full flex flex-col items-center justify-center gap-8 pb-24 pt-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center font-display tracking-tight">
            Check Your Resume Score
          </h2>
          <p className="text-neutral-400 text-sm md:text-base text-center max-w-xl px-4 mt-1">
            Benchmark your resume against any target role in seconds. Get instant match scores, skill gap analysis, and tailored suggestions.
          </p>
          
          <div className="max-md:px-2 h-auto w-full md:w-4/5 lg:w-2/3 flex flex-col items-center justify-center gap-10 mt-6">
            <div className="relative w-full flex flex-col p-8 md:p-12 border border-white/5 rounded-2xl bg-neutral-950/40 backdrop-blur-md overflow-hidden shadow-2xl">
              {/* Radial gradient glow in background */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                {/* Step 1 */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl text-white w-9 h-9 flex items-center justify-center text-base font-bold shadow-md shadow-indigo-500/20 ring-1 ring-white/10">
                    1
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white font-display">Upload Your Resume</h3>
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
                      <FormMessage className="text-red-400 mt-2 text-xs" />
                    </FormItem>
                  )}
                />

                <div className="h-px w-full bg-white/5 my-8" />

                {/* Step 2 */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl text-white w-9 h-9 flex items-center justify-center text-base font-bold shadow-md shadow-indigo-500/20 ring-1 ring-white/10">
                    2
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white font-display">Paste Job Description</h3>
                </div>

                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="min-h-[140px] bg-neutral-900/30 backdrop-blur-xs placeholder:text-neutral-500 p-4 border border-white/10 focus-visible:border-indigo-500/80 focus-visible:ring-1 focus-visible:ring-indigo-500/80 rounded-xl text-white transition-all text-sm resize-none"
                          placeholder="Copy and paste the job description here..."
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 mt-2 text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center mt-10">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-6 px-16 rounded-full transition-all duration-300 transform hover:scale-103 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 disabled:opacity-50 disabled:hover:scale-100 border-0 cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon className="animate-spin w-5 h-5" />
                        <span className="text-base font-bold">Analyzing Resume...</span>
                      </>
                    ) : (
                      <span className="text-base font-bold">Get My Result</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form >
  );
}
