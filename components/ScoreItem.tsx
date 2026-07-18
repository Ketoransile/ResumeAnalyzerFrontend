const getScoreColor = (score: number) => {
  if (score >= 0 && score <= 39) return "#ef4444";
  if (score >= 40 && score <= 69) return "#f59e0b";
  if (score >= 70 && score <= 89) return "#34d399";
  if (score >= 90 && score <= 100) return "#818cf8";
  return "#737373";
};

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ScoreItem = ({
  title,
  value,
  isLarge = false,
}: {
  title: string;
  value: string;
  isLarge: boolean;
}) => {
  const valueNumber = Number(value);
  const scoreColor = getScoreColor(valueNumber);

  const containerClasses = isLarge ? "w-44 h-44" : "w-16 h-16 flex-shrink-0";
  const textSize = isLarge ? "26px" : "16px";
  const valueTextSize = isLarge ? "text-4xl" : "text-lg";
  const titleTextSize = isLarge ? "text-base" : "text-xs";

  return (
    <div
      className={`${
        isLarge
          ? "flex flex-col items-center gap-3"
          : "w-full flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5"
      }`}
    >
      <div className={`${containerClasses} flex items-center justify-center`}>
        <CircularProgressbar
          value={valueNumber}
          text={`${value}%`}
          styles={buildStyles({
            textSize: textSize,
            pathTransitionDuration: 0.8,
            pathColor: scoreColor,
            textColor: scoreColor,
            trailColor: "rgba(255,255,255,0.06)",
            strokeLinecap: "round",
          })}
        />
      </div>

      {!isLarge && (
        <div className="flex flex-col gap-0.5 flex-grow">
          <h1 className={`${titleTextSize} text-neutral-500 font-medium uppercase tracking-wider`}>
            {title}
          </h1>
          <h2
            className={`${valueTextSize} font-bold tracking-tight`}
            style={{ color: scoreColor }}
          >
            {value}%
          </h2>
        </div>
      )}

      {isLarge && title && (
        <h1
          className={`${titleTextSize} text-neutral-400 font-medium text-center tracking-wide`}
        >
          {title}
        </h1>
      )}
    </div>
  );
};
