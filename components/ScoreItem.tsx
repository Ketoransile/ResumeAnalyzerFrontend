// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// export const ScoreItem = ({
//   title,
//   value,
// }: {
//   title: string;
//   value: string;
// }) => {
//   const valueNumber = Number(value);
//   const getScoreColor = (score: number): string => {
//     if (score >= 0 && score <= 39) return "#EF4444";
//     if (score >= 40 && score <= 69) return "#FACC15";
//     if (score >= 70 && score <= 89) return "#4ADE80";
//     if (score >= 90 && score <= 100) return "#3B82F6";
//     return "#D1D5DB";
//   };
//   return (
//     <div className="w-full max-h-64 flex items-center gap-4 justify-between">
//       <CircularProgressbar
//         value={Number(value)}
//         text={`${value} %`}
//         styles={buildStyles({
//           textSize: "16px",
//           pathTransitionDuration: 0.5,
//           pathColor: getScoreColor(valueNumber),
//           textColor: getScoreColor(valueNumber),
//           trailColor: "#E5E7EB",
//         })}
//       />
//       <div className="w-full flex flex-col gap-2">
//         <h1 className="text-xs">{title}</h1>
//         <h2 className="text-lg" style={{ color: getScoreColor(valueNumber) }}>
//           {value}%
//         </h2>
//       </div>
//     </div>
//   );
// };
// This `getScoreColor` function needs to be accessible where the AccordionItem is used,
// or passed down as a prop if ScoreItem is the only place it's defined.
// Assuming it's accessible or defined in the parent component.
const getScoreColor = (score) => {
  if (score >= 0 && score <= 39) return "#EF4444"; // red-500
  if (score >= 40 && score <= 69) return "#FACC15"; // amber-400
  if (score >= 70 && score <= 89) return "#4ADE80"; // green-400
  if (score >= 90 && score <= 100) return "#3B82F6"; // blue-500
  return "#D1D5DB"; // neutral-400
};

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// --- REVISED ScoreItem Component ---
export const ScoreItem = ({
  title,
  value,
  isLarge = false, // New prop to control size and text display
}) => {
  const valueNumber = Number(value);
  const scoreColor = getScoreColor(valueNumber); // Use the consistent color function

  // Determine size classes based on isLarge prop
  const containerClasses = isLarge ? "w-48 h-48" : "w-20 h-20 flex-shrink-0";
  const textSize = isLarge ? "28px" : "18px";
  const valueTextSize = isLarge ? "text-5xl" : "text-xl";
  const titleTextSize = isLarge ? "text-xl" : "text-sm"; // Larger title for overall, smaller for breakdown

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
          text={`${value}%`} // Show percentage directly in the circle
          styles={buildStyles({
            textSize: textSize,
            pathTransitionDuration: 0.5,
            pathColor: scoreColor,
            textColor: scoreColor,
            trailColor: "#424242", // Darker trail for contrast
            strokeLinecap: "round",
          })}
        />
      </div>

      {/* Conditional text display for title and value outside the circle */}
      {!isLarge && (
        <div className="flex flex-col gap-1 flex-grow">
          <h1 className={`${titleTextSize} text-neutral-300 font-medium`}>
            {title}
          </h1>
          {/* We're showing the percentage within the CircularProgressbar's text prop,
              but keeping this here for flexibility if you want text outside as well.
              If only inside, you can remove this h2. */}
          <h2
            className={`${valueTextSize} font-bold`}
            style={{ color: scoreColor }}
          >
            {value}%
          </h2>
        </div>
      )}

      {isLarge &&
        title && ( // Show title below large circle only if provided
          <h1
            className={`${titleTextSize} text-neutral-200 font-semibold text-center`}
          >
            {title}
          </h1>
        )}
    </div>
  );
};
