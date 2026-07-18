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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
        <div
          id="upload"
          className="w-full flex flex-col items-center justify-center gap-10 pb-28 pt-4"
        >
          {/* Section label */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 bg-white/3 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              Get Started
            </div>
            <h2 className="text-3xl md:text-[3rem] font-black text-white text-center leading-[1.1] tracking-[-0.03em]">
              See where you stand,{" "}
              <em
                className="not-italic font-black"
                style={{
                  background:
                    "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                right now.
              </em>
            </h2>
            <p className="text-neutral-500 text-sm md:text-base text-center max-w-lg leading-relaxed font-light">
              Paste any job listing. Upload your resume.{" "}
              <em className="text-neutral-300 not-italic">
                Get a brutally honest, recruiter-level score
              </em>{" "}
              in under a minute.
            </p>
          </div>

          {/* Form card */}
          <div className="max-md:px-2 w-full md:w-4/5 lg:w-[62%]">
            <div className="relative w-full flex flex-col p-8 md:p-12 border border-white/6 rounded-3xl bg-white/[0.02] backdrop-blur-sm overflow-hidden">
              {/* Subtle corner glows */}
              <div className="absolute top-0 right-0 w-[280px] h-[280px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-10">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-violet-300 ring-1 ring-violet-500/20"
                      style={{ background: "rgba(139,92,246,0.12)" }}
                    >
                      1
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Upload your resume{" "}
                      <span className="text-neutral-600 font-normal text-sm italic">
                        — PDF only, max 5MB
                      </span>
                    </h3>
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
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-[10px] text-neutral-700 uppercase tracking-widest font-bold">
                    then
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-violet-300 ring-1 ring-violet-500/20"
                      style={{ background: "rgba(139,92,246,0.12)" }}
                    >
                      2
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Paste the job description{" "}
                      <span className="text-neutral-600 font-normal text-sm italic">
                        — the fuller, the better
                      </span>
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="min-h-[150px] bg-white/[0.03] placeholder:text-neutral-600 p-4 border border-white/8 focus-visible:border-violet-500/50 focus-visible:ring-1 focus-visible:ring-violet-500/30 rounded-2xl text-white transition-all text-sm resize-none font-light leading-relaxed"
                            placeholder="Copy and paste the full job description here. Include requirements, responsibilities, and qualifications for the best results…"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 mt-2 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="group relative overflow-hidden bg-white text-black font-bold py-6 px-14 rounded-2xl transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.03] shadow-xl shadow-white/8 hover:shadow-white/15 disabled:opacity-40 disabled:hover:scale-100 border-0 cursor-pointer flex items-center justify-center gap-2.5 text-base"
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon className="animate-spin w-4 h-4" />
                        <span>Analyzing your resume…</span>
                      </>
                    ) : (
                      <span>Get My Score →</span>
                    )}
                  </Button>
                  <p className="text-[11px] text-neutral-700 font-medium tracking-wide">
                    Takes ~30 seconds · 100% private · Free forever
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
