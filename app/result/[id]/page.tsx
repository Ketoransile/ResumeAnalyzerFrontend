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
import dayjs from "dayjs";
import {
  FiTarget,
  FiKey,
  FiBriefcase,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowUpCircle,
  FiUser,
  FiMessageCircle,
  FiAlertOctagon,
  FiExternalLink,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiBriefcase as FiJobIcon,
} from "react-icons/fi";

const SECTION_CARD =
  "rounded-3xl border border-white/6 bg-white/[0.02] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/10";

const ACCORDION_TRIGGER =
  "flex items-center justify-between w-full text-base font-bold text-neutral-200 cursor-pointer py-2 group hover:no-underline";

const CONTENT_INNER =
  "rounded-2xl border border-white/5 bg-white/[0.015] p-5 flex flex-col items-center gap-5 w-full";

function ScoreBanner({
  score,
  thresholds,
}: {
  score: number;
  thresholds: { low: number; mid: number; lowMsg: string; midMsg: string; highMsg: string };
}) {
  let bg: string, border: string, text: string, msg: string;
  if (score < thresholds.low) {
    bg = "bg-red-500/6"; border = "border-red-500/12"; text = "text-red-300"; msg = thresholds.lowMsg;
  } else if (score < thresholds.mid) {
    bg = "bg-amber-500/6"; border = "border-amber-500/12"; text = "text-amber-300"; msg = thresholds.midMsg;
  } else {
    bg = "bg-emerald-500/6"; border = "border-emerald-500/12"; text = "text-emerald-300"; msg = thresholds.highMsg;
  }
  return (
    <div className={`w-full ${bg} border ${border} rounded-xl p-3.5 ${text} text-center`}>
      <p className="text-sm font-medium leading-relaxed">{msg}</p>
    </div>
  );
}

function ListItem({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: "red" | "amber" | "cyan" | "indigo" | "violet";
}) {
  const colors = {
    red: "bg-red-500/4 border-red-500/10 text-red-200 hover:bg-red-500/8 hover:border-red-500/15",
    amber: "bg-amber-500/4 border-amber-500/10 text-amber-200 hover:bg-amber-500/8 hover:border-amber-500/15",
    cyan: "bg-violet-500/4 border-violet-500/10 text-violet-200 hover:bg-violet-500/8 hover:border-violet-500/15",
    indigo: "bg-indigo-500/4 border-indigo-500/10 text-indigo-200 hover:bg-indigo-500/8 hover:border-indigo-500/15",
    violet: "bg-violet-500/4 border-violet-500/10 text-violet-200 hover:bg-violet-500/8 hover:border-violet-500/15",
  };
  return (
    <li
      className={`flex items-start gap-3 rounded-xl px-4 py-3 border text-sm leading-relaxed transition-all duration-200 ${colors[accent]}`}
    >
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-70" />
      <span className="font-light">{children}</span>
    </li>
  );
}

function EmptyState({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center w-full">
      <div className="w-12 h-12 rounded-2xl bg-emerald-500/8 border border-emerald-500/15 flex items-center justify-center">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      <p className="text-base font-bold text-emerald-300">{title}</p>
      <p className="text-sm text-neutral-500 font-light max-w-sm">{subtitle}</p>
    </div>
  );
}

function SectionIcon({ icon: Icon, color }: { icon: React.ElementType; color: string }) {
  return (
    <div
      className="w-7 h-7 rounded-lg flex items-center justify-center ring-1 ring-white/8 flex-shrink-0"
      style={{ background: `${color}15` }}
    >
      <Icon style={{ color }} className="w-3.5 h-3.5" />
    </div>
  );
}

export default function ResumeAnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();

  const [analysisData, setAnalysisData] = useState<IResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showJobDesc, setShowJobDesc] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAnalysisData() {
      const { id } = await params;
      const token = await getToken();

      if (!isLoaded || !isSignedIn) {
        if (isLoaded) setError("User not authenticated.");
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
          ((error as { response: { status: number } }).response.status === 403 ||
            (error as { response: { status: number } }).response.status === 404)
        ) {
          setError("You do not have permission to view this analysis or it does not exist.");
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message?: string }).message === "string"
        ) {
          setError((error as { message: string }).message || "Failed to load analysis.");
        } else {
          setError("Failed to load analysis.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysisData();
  }, [getToken, params, isLoaded, isSignedIn, router]);

  if (loading || (!isLoaded && !error && !isSignedIn)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/6" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
        </div>
        <p className="text-sm text-neutral-500 font-medium">Loading analysis…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-red-500/8 border border-red-500/15 flex items-center justify-center mb-1">
          <FiAlertOctagon className="w-5 h-5 text-red-400" />
        </div>
        <p className="text-base font-bold text-white">{error}</p>
        {error === "You do not have permission to view this analysis or it does not exist." && (
          <p className="text-sm text-neutral-600 font-light">
            Check the URL or select an analysis from your history.
          </p>
        )}
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 gap-3">
        <p className="text-sm text-neutral-500 font-light">No analysis data found for this ID.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Sleek Top Panel Header ── */}
      <div className="p-6 rounded-3xl border border-white/6 bg-white/[0.02] backdrop-blur-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center text-violet-400">
              <FiFileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight tracking-tight">
                {analysisData.resumeFileName || "Untitled Resume"}
              </h2>
              <p className="text-xs text-neutral-500 font-light mt-0.5">
                Analyzed on {dayjs(analysisData.analysisDate).format("MMMM D, YYYY [at] h:mm A")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {analysisData.resumeCloudinaryUrl && (
              <a
                href={analysisData.resumeCloudinaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/8 text-neutral-300 text-xs font-semibold hover:bg-white/8 hover:text-white transition-all duration-200"
              >
                <span>View Original PDF</span>
                <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => setShowJobDesc(!showJobDesc)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/8 text-neutral-300 text-xs font-semibold hover:bg-white/8 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <FiJobIcon className="w-3.5 h-3.5" />
              <span>Target Role</span>
              {showJobDesc ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Collapsible Job Description panel */}
        {showJobDesc && (
          <div className="mt-2 pt-4 border-t border-white/5 animate-fade-in">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2">
              Target Job Description
            </h4>
            <div className="max-h-40 overflow-y-auto rounded-xl border border-white/5 bg-black/20 p-4 text-xs text-neutral-400 font-light leading-relaxed scrollbar-thin whitespace-pre-line">
              {analysisData.jobDescriptionText}
            </div>
          </div>
        )}
      </div>

      {/* ── Main accordion blocks ── */}
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
        {/* 1. Overall Suitability Score */}
        <AccordionItem value="item-1" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiTarget} color="#818cf8" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Overall Suitability Score
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            <div className={CONTENT_INNER}>
              <ScoreItem
                title="Overall Match"
                value={analysisData.overall_fit_score.toString()}
                isLarge={true}
              />
              <p className="text-center text-neutral-400 text-xs max-w-lg font-light leading-relaxed">
                This score reflects the comprehensive alignment of your profile with the job description,
                across all key analysis areas.
              </p>
              <ScoreBanner
                score={analysisData.overall_fit_score}
                thresholds={{
                  low: 60,
                  mid: 80,
                  lowMsg: "Your profile needs significant tailoring. Focus on improving skill matches and experience relevance.",
                  midMsg: "A solid start — review the detailed sections below to further optimize.",
                  highMsg: "Excellent fit! Your profile is highly aligned with this role.",
                }}
              />
              <div className="w-full pt-4 border-t border-white/5">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 mb-4 text-center">
                  Score Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

        {/* 2. Keyword Match Score */}
        <AccordionItem value="item-2" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiKey} color="#34d399" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Keyword Match Score
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            <div className={CONTENT_INNER}>
              <ScoreItem
                title="Keyword Match"
                value={analysisData.keyword_match_score.toString()}
                isLarge={true}
              />
              <p className="text-center text-neutral-400 text-xs max-w-md font-light leading-relaxed">
                Percentage of key terms and skills from the job description found in your resume.
              </p>
              <ScoreBanner
                score={analysisData.keyword_match_score}
                thresholds={{
                  low: 70,
                  mid: 90,
                  lowMsg: "Your resume may be missing key terms. Incorporate more direct keywords from the job description.",
                  midMsg: "Good match — you can improve by weaving in more exact keywords.",
                  highMsg: "Fantastic! Your resume is highly optimized for keywords and ATS.",
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. Experience Relevance Score */}
        <AccordionItem value="item-3" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiBriefcase} color="#c084fc" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Experience Relevance Score
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            <div className={CONTENT_INNER}>
              <ScoreItem
                title="Experience Relevance"
                value={analysisData.experience_relevance_score.toString()}
                isLarge={true}
              />
              <p className="text-center text-neutral-400 text-xs max-w-md font-light leading-relaxed">
                How well your work history aligns with the required experience in the job description.
              </p>
              <ScoreBanner
                score={analysisData.experience_relevance_score}
                thresholds={{
                  low: 75,
                  mid: 100,
                  lowMsg: "Consider tailoring your experience descriptions to better highlight relevant achievements for this role.",
                  midMsg: "",
                  highMsg: "Your experience strongly aligns with the job requirements.",
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. Matched Skills */}
        <AccordionItem value="item-4" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiCheckCircle} color="#34d399" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Your Matched Skills
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            {analysisData.top_matching_skills.length > 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 w-full">
                <p className="text-neutral-400 mb-4 font-medium text-sm">
                  These key skills from your profile match the job description:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysisData.top_matching_skills.map((skill, index) => (
                    <KeySkillsCard title={skill} key={index} />
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-neutral-600 text-xs font-light italic">
                    Showcase these prominently in your application to stand out.
                  </p>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={FiCheckCircle}
                title="No direct skill matches found"
                subtitle="Consider tailoring your profile more closely to the job description to highlight relevant abilities."
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 5. Skill Gaps */}
        <AccordionItem value="item-5" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiAlertTriangle} color="#f59e0b" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Skill Gaps & Opportunities
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            {analysisData.key_qualification_gaps.length > 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 w-full">
                <p className="text-neutral-400 mb-4 font-medium text-sm">
                  Potential areas for growth based on this role:
                </p>
                <ul className="flex flex-col gap-2">
                  {analysisData.key_qualification_gaps.map((gap, index) => (
                    <ListItem key={index} accent="amber">{gap}</ListItem>
                  ))}
                </ul>
              </div>
            ) : (
              <EmptyState
                icon={FiCheckCircle}
                title="No significant skill gaps identified"
                subtitle="Your qualifications align well with this role. Keep up the great work!"
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 6. Actionable Recommendations */}
        <AccordionItem value="item-6" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiArrowUpCircle} color="#818cf8" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Actionable Recommendations
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            {analysisData.actionable_enhancements.length > 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 w-full">
                <p className="text-neutral-400 mb-4 font-medium text-sm">
                  Consider these steps to boost your application:
                </p>
                <ul className="flex flex-col gap-2">
                  {analysisData.actionable_enhancements.map((enhancement, index) => (
                    <ListItem key={index} accent="violet">{enhancement}</ListItem>
                  ))}
                </ul>
              </div>
            ) : (
              <EmptyState
                icon={FiCheckCircle}
                title="Your profile is well-optimized"
                subtitle="No immediate enhancements detected. Keep shining!"
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 7. Tailored Profile Summary */}
        <AccordionItem value="item-7" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiUser} color="#c084fc" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Your Tailored Profile Summary
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 w-full">
              {analysisData.tailored_summary_for_role ? (
                <>
                  <p className="text-neutral-200 text-sm leading-[1.8] font-light">
                    {analysisData.tailored_summary_for_role}
                  </p>
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(analysisData.tailored_summary_for_role);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-neutral-300 text-xs font-semibold hover:bg-white/8 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      Copy Summary
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-neutral-600 italic text-sm font-light">
                  No tailored summary available yet. Provide more details or select a job description.
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 8. Interview Questions */}
        <AccordionItem value="item-8" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiMessageCircle} color="#818cf8" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Relevant Interview Questions
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            {analysisData.relevant_interview_questions.length > 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 w-full">
                <p className="text-neutral-400 mb-4 font-medium text-sm">
                  Practice these to prepare for interviews:
                </p>
                <ul className="flex flex-col gap-2">
                  {analysisData.relevant_interview_questions.map((question, index) => (
                    <ListItem key={index} accent="indigo">{question}</ListItem>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center w-full">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800/50 border border-white/6 flex items-center justify-center">
                  <FiMessageCircle className="w-5 h-5 text-neutral-500" />
                </div>
                <p className="text-base font-bold text-neutral-400 mt-2">No questions generated</p>
                <p className="text-sm text-neutral-600 font-light max-w-sm">
                  Provide more details to generate relevant interview questions.
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 9. Red Flags */}
        <AccordionItem value="item-9" className={SECTION_CARD}>
          <AccordionTrigger className={ACCORDION_TRIGGER}>
            <span className="flex items-center gap-2.5">
              <SectionIcon icon={FiAlertOctagon} color="#f59e0b" />
              <span className="group-hover:text-white transition-colors tracking-tight">
                Potential Red Flags
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-4 text-neutral-300">
            {analysisData.potential_red_flags.length > 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 w-full">
                <p className="text-neutral-400 mb-4 font-medium text-sm">
                  Review these points in your profile:
                </p>
                <ul className="flex flex-col gap-2">
                  {analysisData.potential_red_flags.map((flag, index) => (
                    <ListItem key={index} accent="red">{flag}</ListItem>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-neutral-600 text-xs font-light italic">
                    It&apos;s recommended to address these before applying.
                  </p>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={FiCheckCircle}
                title="No red flags detected"
                subtitle="Your profile appears clear and ready for review."
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
