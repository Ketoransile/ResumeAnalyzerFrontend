import { IResumeAnalysisResult } from "@/app/result/[id]/fetchResumeAnalysis";
import { Button } from "./ui/button"; // Assuming your Button component path
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

const getScoreColor = (score: number) => {
  if (score >= 0 && score <= 39) return "bg-red-600"; // Tailwind class
  if (score >= 40 && score <= 69) return "bg-amber-500"; // Tailwind class
  if (score >= 70 && score <= 89) return "bg-green-600"; // Tailwind class
  if (score >= 90 && score <= 100) return "bg-blue-600"; // Tailwind class
  return "bg-neutral-500"; // Default or gray
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
  if (!analysisData) return null; // Ensure data exists before rendering

  const {
    resumeFileName,
    analysisDate,
    jobDescriptionText,
    overall_fit_score,
  } = analysisData;

  // const formattedDate = analysisDate ? formatDate(analysisDate) : "N/A";
  const formattedDate = dayjs(analysisDate).format("YYYY-MM-DD ");
  const formattedTime = dayjs(analysisDate).format("h:mm A");
  const scoreBgColor = getScoreColor(overall_fit_score); // Get the appropriate background color class

  return (
    <div
      className={`
    flex flex-col items-start gap-4 p-4 rounded-xl
    border
    transition-all duration-200 ease-in-out
    cursor-pointer
    
    ${activeCard
          ? "bg-indigo-900/20 backdrop-blur-md border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10" // Active styling
          : "bg-neutral-900/40 backdrop-blur-sm border-white/5 text-neutral-300 shadow-sm hover:bg-neutral-900/60 hover:border-white/10 hover:text-white hover:shadow-md" // Default styling
        }
  `}
      onClick={onClick} // Makes the entire card clickable
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-sm font-semibold truncate max-w-[calc(100%-80px)]">
          {resumeFileName || "Untitled Resume"}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-xs flex-shrink-0 opacity-80">{formattedDate}</p>
          <p className="text-xs flex-shrink-0 opacity-80">{formattedTime}</p>
        </div>
      </div>

      <p className="text-sm line-clamp-2 leading-tight">
        {jobDescriptionText || "No job description provided."}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          className={`rounded-full px-4 py-1 text-xs font-bold text-white
        ${scoreBgColor}
        hover:${scoreBgColor.replace("bg-", "bg-")}/80
        transition-colors duration-200
        min-w-[70px] justify-center
      `}
          size="sm"
          disabled
        >
          Score {overall_fit_score}%
        </Button>
      </div>
    </div>
  );
};
