const getScoreColor = (score: number) => {
  if (score >= 0 && score <= 39) return "#EF4444";
  if (score >= 40 && score <= 69) return "#FACC15";
  if (score >= 70 && score <= 89) return "#4ADE80";
  if (score >= 90 && score <= 100) return "#3B82F6";
  return "#D1D5DB"; // neutral-400
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

  const containerClasses = isLarge ? "w-48 h-48" : "w-20 h-20 flex-shrink-0";
  const textSize = isLarge ? "28px" : "18px";
  const valueTextSize = isLarge ? "text-5xl" : "text-xl";
  const titleTextSize = isLarge ? "text-xl" : "text-sm";

  return (
    <div
      className={`
        ${
          isLarge
            ? "flex flex-col items-center gap-4"
            : "w-full flex items-center gap-4"
        }
      `}
    >
      <div className={`${containerClasses} flex items-center justify-center`}>
        <CircularProgressbar
          value={valueNumber}
          text={`${value}%`}
          styles={buildStyles({
            textSize: textSize,
            pathTransitionDuration: 0.5,
            pathColor: scoreColor,
            textColor: scoreColor,
            trailColor: "#424242",
            strokeLinecap: "round",
          })}
        />
      </div>

      {!isLarge && (
        <div className="flex flex-col gap-1 flex-grow">
          <h1 className={`${titleTextSize} text-neutral-300 font-medium`}>
            {title}
          </h1>

          <h2
            className={`${valueTextSize} font-bold`}
            style={{ color: scoreColor }}
          >
            {value}%
          </h2>
        </div>
      )}

      {isLarge && title && (
        <h1
          className={`${titleTextSize} text-neutral-200 font-semibold text-center`}
        >
          {title}
        </h1>
      )}
    </div>
  );
};
