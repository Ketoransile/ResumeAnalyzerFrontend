import { IResumeAnalysisResult } from "@/app/result/[id]/fetchResumeAnalysis";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

const getScoreColor = (score: number) => {
  if (score >= 0 && score <= 39) return "text-red-400 bg-red-500/10 border-red-500/20";
  if (score >= 40 && score <= 69) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
  if (score >= 70 && score <= 89) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  if (score >= 90 && score <= 100) return "text-violet-400 bg-violet-500/10 border-violet-500/20";
  return "text-neutral-400 bg-neutral-500/10 border-neutral-500/20";
};

interface IResumeAnalysisCardParams {
  analysisData: IResumeAnalysisResult;
  onClick: () => void;
}

export const ResumeAnalysisCard = ({
  analysisData,
  onClick,
}: IResumeAnalysisCardParams) => {
  const pathname = usePathname();
  const activeCard: boolean = pathname.includes(`${analysisData._id}`);
  if (!analysisData) return null;

  const {
    resumeFileName,
    analysisDate,
    jobDescriptionText,
    overall_fit_score,
  } = analysisData;

  const formattedDate = dayjs(analysisDate).format("MMM D, YYYY");
  const formattedTime = dayjs(analysisDate).format("h:mm A");
  const scoreClasses = getScoreColor(overall_fit_score);

  return (
    <div
      className={`
        group flex flex-col gap-3 p-4 rounded-2xl border
        transition-all duration-200 cursor-pointer
        ${
          activeCard
            ? "bg-violet-500/8 border-violet-500/25 shadow-lg shadow-violet-500/5"
            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
        }
      `}
      onClick={onClick}
    >
      {/* Header row */}
      <div className="w-full flex items-start justify-between gap-2">
        <h3
          className={`text-sm font-semibold truncate max-w-[70%] ${
            activeCard ? "text-white" : "text-neutral-300 group-hover:text-white"
          } transition-colors`}
        >
          {resumeFileName || "Untitled Resume"}
        </h3>
        <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
          <span className="text-[10px] text-neutral-600 font-medium">{formattedDate}</span>
          <span className="text-[10px] text-neutral-700">{formattedTime}</span>
        </div>
      </div>

      {/* Job description preview */}
      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-light">
        {jobDescriptionText || "No job description provided."}
      </p>

      {/* Score badge */}
      <div className="flex items-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${scoreClasses}`}
        >
          <span className="tabular-nums">{overall_fit_score}%</span>
          <span className="font-medium opacity-70">match</span>
        </span>
      </div>
    </div>
  );
};
