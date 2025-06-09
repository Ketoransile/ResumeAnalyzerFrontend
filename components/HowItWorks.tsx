// import { useEffect } from "react";
// import { AiOutlineUpload } from "react-icons/ai";
// import { MdOutlineTipsAndUpdates } from "react-icons/md";
// import { RiFileCopyLine } from "react-icons/ri";

// export default function HowItWorksSection() {
//   useEffect(() => {
//     // This effect runs whenever the component mounts or updates
//     // Check if there's a hash in the URL (e.g., #howItWorks)
//     if (typeof window !== "undefined" && window.location.hash) {
//       const id = window.location.hash.substring(1); // Get the ID part (e.g., "howItWorks")
//       const element = document.getElementById(id);

//       if (element) {
//         // Give the page a tiny moment to render fully before attempting to scroll
//         // This is crucial for Next.js where content might not be immediately available
//         setTimeout(() => {
//           element.scrollIntoView({ behavior: "smooth", block: "start" });
//         }, 100); // A small delay (e.g., 100ms) is often necessary
//       }
//     }
//   }, []);
//   return (
//     // <div
//     //   id="howItWorks"
//     //   className="flex flex-col items-center justify-center gap-16 pt-20 pb-20"
//     // >
//     //   <h1 className="text-3xl font-bold">How it Works</h1>
//     //   <div className="flex items-center justify-between gap-32">
//     //     <div className="flex flex-col items-center justify-center  gap-4">
//     //       <AiOutlineUpload className="text-4xl text-white" />
//     //       <h1 className="text-md font-bold text-center">Upload Your Resume</h1>
//     //       <p className="text-sm text-center">
//     //         Easily upload your resume to get started with your personalized AI
//     //         review.
//     //       </p>
//     //     </div>
//     //     <div className="flex flex-col items-center justify-center  gap-4">
//     //       <RiFileCopyLine className="text-4xl text-white" />
//     //       <h1 className="text-md font-bold text-center">
//     //         Paste the Job Description
//     //       </h1>
//     //       <p className="text-sm text-center text-1/2">
//     //         Add the job details effortlessly to tailor your resume analysis for
//     //         the specific role.
//     //       </p>
//     //     </div>
//     //     <div className="flex flex-col items-center justify-center  gap-4">
//     //       <MdOutlineTipsAndUpdates className="text-4xl text-white" />
//     //       <h1 className="text-md font-bold text-center">
//     //         Optimize Your Resume
//     //       </h1>
//     //       <p className="text-sm text-center">
//     //         Receive personalized tips instantly to make your resume stand out.
//     //       </p>
//     //     </div>
//     //   </div>
//     // </div>
//     <div
//       id="howItWorks" // Keep the ID for smooth scrolling
//       className="relative flex flex-col items-center justify-center pt-20 pb-20
//                  bg-neutral-900 min-h-screen text-white px-4 md:px-0" // Overall section styling
//     >
//       {/* Optional: Subtle background gradient/blob for depth */}
//       <div className="w-full absolute inset-0 bg-neutral-900 pointer-events-none p-4 z-0"></div>

//       <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center z-10">
//         How It Works
//       </h1>

//       <div
//         className="relative z-10 flex flex-col md:flex-row items-center justify-center
//                       gap-4 md:gap-16 lg:gap-24 max-w-6xl mx-auto px-4"
//       >
//         {" "}
//         {/* Responsive layout, increased gap, max-width */}
//         {/* Step 1: Upload Your Resume */}
//         <div
//           className="flex flex-col items-center text-center p-6
//                         bg-neutral-800/70 rounded-xl shadow-xl border border-neutral-700
//                         w-full md:w-1/3 min-h-[280px] hover:border-blue-500 transition-all duration-300"
//         >
//           {" "}
//           {/* Card styling */}
//           <div className="bg-blue-600 rounded-full p-4 mb-4">
//             {" "}
//             {/* Icon container */}
//             <AiOutlineUpload className="text-3xl text-white" />
//           </div>
//           <h2 className="text-lg font-bold text-white mb-2">
//             1. Upload Your Resume
//           </h2>
//           <p className="text-sm text-neutral-300 max-w-xs">
//             Easily upload your resume to get started with your personalized AI
//             review.
//           </p>
//         </div>
//         {/* Arrow/Separator for Desktop */}
//         <div className="hidden md:flex flex-col items-center justify-center text-neutral-400">
//           <svg
//             className="w-10 h-10"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M17 8l4 4m0 0l-4 4m4-4H3"
//             ></path>
//           </svg>
//         </div>
//         {/* Arrow/Separator for Mobile (Vertical) */}
//         <div className="md:hidden flex flex-col items-center justify-center text-neutral-400">
//           <svg
//             className="w-10 h-10"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 17l4-4m-4 4l-4-4m4 4V3"
//             ></path>
//           </svg>
//         </div>
//         {/* Step 2: Paste the Job Description */}
//         <div
//           className="flex flex-col items-center text-center p-6
//                         bg-neutral-800/70 rounded-xl shadow-xl border border-neutral-700
//                         w-full md:w-1/3 min-h-[280px] hover:border-purple-500 transition-all duration-300"
//         >
//           <div className="bg-purple-600 rounded-full p-4 mb-4">
//             <RiFileCopyLine className="text-3xl text-white" />
//           </div>
//           <h2 className="text-lg font-bold text-white mb-2">
//             2. Paste the Job Description
//           </h2>
//           <p className="text-sm text-neutral-300 max-w-xs">
//             Add the job details effortlessly to tailor your resume analysis for
//             the specific role.
//           </p>
//         </div>
//         {/* Arrow/Separator for Desktop */}
//         <div className="hidden md:flex flex-col items-center justify-center text-neutral-400">
//           <svg
//             className="w-10 h-10"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M17 8l4 4m0 0l-4 4m4-4H3"
//             ></path>
//           </svg>
//         </div>
//         {/* Arrow/Separator for Mobile (Vertical) */}
//         <div className="md:hidden flex flex-col items-center justify-center text-neutral-400">
//           <svg
//             className="w-10 h-10"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 17l4-4m-4 4l-4-4m4 4V3"
//             ></path>
//           </svg>
//         </div>
//         {/* Step 3: Optimize Your Resume */}
//         <div
//           className="flex flex-col items-center text-center p-6
//                         bg-neutral-800/70 rounded-xl shadow-xl border border-neutral-700
//                         w-full md:w-1/3 min-h-[280px] hover:border-green-500 transition-all duration-300"
//         >
//           <div className="bg-green-600 rounded-full p-4 mb-4">
//             <MdOutlineTipsAndUpdates className="text-3xl text-white" />
//           </div>
//           <h2 className="text-lg font-bold text-white mb-2">
//             3. Optimize Your Resume
//           </h2>
//           <p className="text-sm text-neutral-300 max-w-xs">
//             Receive personalized tips instantly to make your resume stand out.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// 'use client'; // Ensure this is present if using hooks like useEffect

import { useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";

export default function HowItWorksSection() {
  useEffect(() => {
    // This effect runs whenever the component mounts or updates
    // Check if there's a hash in the URL (e.g., #howItWorks)
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.substring(1); // Get the ID part (e.g., "howItWorks")
      const element = document.getElementById(id);

      if (element) {
        // Give the page a tiny moment to render fully before attempting to scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <div
      id="howItWorks" // Keep the ID for smooth scrolling
      className="relative flex flex-col items-center justify-center pt-20 pb-20
                 bg-black min-h-screen text-white px-4 md:px-0" // Overall section styling
    >
      {/* Optional: Subtle background gradient/blob for depth */}
      {/* <div className="w-full absolute inset-0 bg-neutral-900 pointer-events-none p-4 z-0"></div> */}

      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-16 text-center z-10">
        How It Works
      </h1>

      <div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center
                     gap-8 md:gap-4 lg:gap-6 max-w-6xl mx-auto px-4" // Adjusted gaps: `md:gap-4` (16px), `lg:gap-6` (24px)
      >
        {/* Step 1: Upload Your Resume */}
        <div
          className="flex flex-col items-center text-center p-6
                     bg-neutral-800/70 rounded-xl shadow-xl border border-neutral-700
                     w-full md:w-[calc((100%-2*16px)/3)] lg:w-[calc((100%-2*24px)/3)] min-h-[280px] hover:border-blue-500 transition-all duration-300" // Calculated width for 3 items + gaps
        >
          <div className="bg-blue-600 rounded-full p-4 mb-4">
            <AiOutlineUpload className="text-3xl text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            1. Upload Your Resume
          </h2>
          <p className="text-sm text-neutral-300 max-w-xs">
            Easily upload your resume to get started with your personalized AI
            review.
          </p>
        </div>

        {/* Arrow/Separator for Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center text-neutral-400">
          <svg
            className="w-8 h-8" // Slightly smaller arrows to fit tighter gap
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </div>
        {/* Arrow/Separator for Mobile (Vertical) - Still needed if they wrap to 1 column */}
        <div className="md:hidden flex flex-col items-center justify-center text-neutral-400">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17l4-4m-4 4l-4-4m4 4V3"
            ></path>
          </svg>
        </div>

        {/* Step 2: Paste the Job Description */}
        <div
          className="flex flex-col items-center text-center p-6
                     bg-neutral-800/70 rounded-xl shadow-xl border border-neutral-700
                     w-full md:w-[calc((100%-2*16px)/3)] lg:w-[calc((100%-2*24px)/3)] min-h-[280px] hover:border-purple-500 transition-all duration-300" // Calculated width for 3 items + gaps
        >
          <div className="bg-purple-600 rounded-full p-4 mb-4">
            <RiFileCopyLine className="text-3xl text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            2. Paste the Job Description
          </h2>
          <p className="text-sm text-neutral-300 max-w-xs">
            Add the job details effortlessly to tailor your resume analysis for
            the specific role.
          </p>
        </div>

        {/* Arrow/Separator for Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center text-neutral-400">
          <svg
            className="w-8 h-8" // Slightly smaller arrows to fit tighter gap
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </div>
        {/* Arrow/Separator for Mobile (Vertical) */}
        <div className="md:hidden flex flex-col items-center justify-center text-neutral-400">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17l4-4m-4 4l-4-4m4 4V3"
            ></path>
          </svg>
        </div>

        {/* Step 3: Optimize Your Resume */}
        <div
          className="flex flex-col items-center text-center p-6
                     bg-neutral-800/70 rounded-xl shadow-xl border border-neutral-700
                     w-full md:w-[calc((100%-2*16px)/3)] lg:w-[calc((100%-2*24px)/3)] min-h-[280px] hover:border-green-500 transition-all duration-300" // Calculated width for 3 items + gaps
        >
          <div className="bg-green-600 rounded-full p-4 mb-4">
            <MdOutlineTipsAndUpdates className="text-3xl text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            3. Optimize Your Resume
          </h2>
          <p className="text-sm text-neutral-300 max-w-xs">
            Receive personalized tips instantly to make your resume stand out.
          </p>
        </div>
      </div>
    </div>
  );
}
