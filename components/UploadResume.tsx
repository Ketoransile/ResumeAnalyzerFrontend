import DragAndDropUpload from "./DragAndDropUpload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
export default function UploadResume() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 pb-20">
      <h1 className="text-3xl  font-bold text-center">
        Check Your Resume Score
      </h1>
      <h2 className="text-md text-center ">
        We will check your resume score based on the job description
      </h2>
      <div className=" h-auto w-2/3 flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col  p-6 border border-neutral-800 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="bg-white rounded-full text-black w-6 h-6 flex items-center justify-center text-sm font-bold">
              1
            </span>
            <h1>Upload Your Resume</h1>
          </div>
          <DragAndDropUpload />

          <div className="h-auto flex items-center gap-2 py-8">
            <span className="bg-white rounded-full text-black w-6 h-6 flex items-center justify-center text-sm font-bold">
              2
            </span>
            <h1>Add Job Description </h1>
          </div>
          <Textarea
            className="h-32 placeholder:text-neutral-700 p-2 border border-neutral-600"
            placeholder="Copy and paste the job description here."
          />
          <Button
            type="submit"
            className="bg-white py-4 px-12 mt-8 text-black w-fit self-center hover:bg-neutral-400 cursor-pointer"
          >
            Get Result
          </Button>
        </div>
      </div>
    </div>
  );
}
