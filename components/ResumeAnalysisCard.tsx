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
    // <div
    //   className={`
    //     flex flex-col items-start gap-4 p-4 rounded-xl
    //     border border-neutral-700

    //     shadow-sm hover:shadow-md
    //     transition-all duration-200 ease-in-out
    //     cursor-pointer
    //     hover:border-neutral-600
    //     ${activeCard ? "bg-blue-500" : "bg-neutral-800/40"}
    //   `}
    //   onClick={onClick} // Makes the entire card clickable
    // >
    //   <div className="w-full flex items-center justify-between text-neutral-400">
    //     <h1 className="text-xs font-semibold truncate max-w-[calc(100%-80px)]">
    //       {resumeFileName || "Untitled Resume"}
    //     </h1>
    //     <p className="text-xs flex-shrink-0">{formattedDate}</p>
    //   </div>

    //   <p className="text-neutral-300 text-sm line-clamp-2 leading-tight">
    //     {jobDescriptionText || "No job description provided."}
    //   </p>

    //   <div className="flex items-center gap-2 flex-wrap">
    //     <Button
    //       className={`rounded-full px-4 py-1 text-xs font-bold text-white
    //         ${scoreBgColor}
    //         hover:${scoreBgColor.replace("bg-", "bg-")}/80
    //         transition-colors duration-200
    //         min-w-[70px] justify-center
    //       `}
    //       size="sm"
    //       disabled // Styled as a tag, not interactive
    //     >
    //       Score {overall_fit_score}%
    //     </Button>
    //     {/* {aiModelUsed && ( // Only show if aiModelUsed exists
    //       <Button
    //         className="
    //           rounded-full px-4 py-1 text-xs font-bold text-neutral-100
    //           bg-neutral-700 hover:bg-neutral-600
    //           border border-neutral-600
    //           transition-colors duration-200
    //           min-w-[70px] justify-center
    //         "
    //         size="sm"
    //         disabled // Styled as a tag, not interactive
    //       >
    //         {aiModelUsed}
    //       </Button>
    //     )} */}
    //   </div>
    // </div>
    //   <div
    //     className={`
    //   flex flex-col items-start gap-4 p-4 rounded-xl
    //   border
    //   transition-all duration-200 ease-in-out
    //   cursor-pointer

    //   ${
    //     activeCard // This variable (or activeCard) must correctly determine the active state
    //       ? "bg-blue-950/40 border-blue-500 text-blue-100 shadow-lg shadow-blue-500/20" // Active: very dark blue background tint, prominent blue border, light blue text, subtle blue glow
    //       : "bg-neutral-800/40 border-neutral-700 text-neutral-300 shadow-sm hover:border-neutral-600 hover:shadow-md" // Default: translucent dark background, neutral border, neutral text, subtle shadow, hover effects for border & shadow
    //   }
    // `}
    //     onClick={onClick} // Makes the entire card clickable
    //   >
    //     {/* Inner content: Removed direct text color classes to allow conditional parent classes to apply */}
    //     <div className="w-full flex items-center justify-between">
    //       <h1 className="text-sm font-semibold truncate max-w-[calc(100%-80px)]">
    //         {resumeFileName || "Untitled Resume"}
    //       </h1>
    //       <p className="text-xs flex-shrink-0 opacity-80">{formattedDate}</p>
    //     </div>

    //     <p className="text-sm line-clamp-2 leading-tight">
    //       {jobDescriptionText || "No job description provided."}
    //     </p>

    //     <div className="flex items-center gap-2 flex-wrap">
    //       <Button
    //         className={`rounded-full px-4 py-1 text-xs font-bold text-white
    //       ${scoreBgColor}
    //       hover:${scoreBgColor.replace("bg-", "bg-")}/80
    //       transition-colors duration-200
    //       min-w-[70px] justify-center
    //     `}
    //         size="sm"
    //         disabled
    //       >
    //         Score {overall_fit_score}%
    //       </Button>
    //       {/* {aiModelUsed && (...) } */}
    //     </div>
    //   </div>
    <div
      className={`
    flex flex-col items-start gap-4 p-4 rounded-xl
    border
    transition-all duration-200 ease-in-out
    cursor-pointer
    
    ${
      activeCard // Using your preferred 'activeCard' variable
        ? "bg-blue-950/40 border-blue-500 text-blue-100 shadow-lg shadow-blue-500/20" // Active: very dark blue background tint, prominent blue border, light blue text, subtle blue glow
        : "bg-neutral-800/40 border-neutral-700 text-neutral-300 shadow-sm hover:border-neutral-600 hover:shadow-md" // Default: translucent dark background, neutral border, neutral text, subtle shadow, border/shadow hover
    }
  `}
      onClick={onClick} // Makes the entire card clickable
    >
      {/* Inner content: Removed direct text color classes to allow conditional parent classes to apply */}
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
        {/* {aiModelUsed && (...) } */}
      </div>
    </div>
  );
};
