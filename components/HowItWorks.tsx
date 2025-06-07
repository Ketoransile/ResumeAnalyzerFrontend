import { AiOutlineUpload } from "react-icons/ai";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";

export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 pt-20 pb-20">
      <h1 className="text-3xl font-bold">How it Works</h1>
      <div className="flex items-center justify-between gap-32">
        <div className="flex flex-col items-center justify-center  gap-4">
          <AiOutlineUpload className="text-4xl text-white" />
          <h1 className="text-md font-bold text-center">Upload Your Resume</h1>
          <p className="text-sm text-center">
            Easily upload your resume to get started with your personalized AI
            review.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center  gap-4">
          <RiFileCopyLine className="text-4xl text-white" />
          <h1 className="text-md font-bold text-center">
            Paste the Job Description
          </h1>
          <p className="text-sm text-center text-1/2">
            Add the job details effortlessly to tailor your resume analysis for
            the specific role.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center  gap-4">
          <MdOutlineTipsAndUpdates className="text-4xl text-white" />
          <h1 className="text-md font-bold text-center">
            Optimize Your Resume
          </h1>
          <p className="text-sm text-center">
            Receive personalized tips instantly to make your resume stand out.
          </p>
        </div>
      </div>
    </div>
  );
}
