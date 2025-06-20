import Link from "next/link";
import { Button } from "./ui/button";
import { Highlight } from "./ui/hero-highlight";

export const Hero = () => {
  return (
    <div className=" flex flex-col gap-6 items-center justify-center pt-20 lg:pt-32">
      <h1 className="w-2/3 text-2xl lg:text-4xl xl:text-6xl text-center font-bold leading-relaxed ">
        AI Knows What Recruiters Want —{" "}
        <Highlight className="text-black dark:text-white">
          Does Your Resume?
        </Highlight>
      </h1>
      <h2 className="text-sm max-md:py-12  text-center w-full px-4 md:w-2/3 lg:w-1/2">
        Let our AI-powered resume analyzer review your resume the way a
        recruiter would. Instantly get a score along with detailed, actionable
        tips to improve your chances of landing interviews—completely free.
      </h2>
      <p className="text-xs text-neutral-300 mt-2">
        Powered by cutting-edge{" "}
        <span className="font-semibold">GPT-4.1 AI</span> technology.
      </p>
      <Button
        className="py-6 bg-white text-black mt-6 hover:bg-neutral-400"
        asChild
      >
        <Link href="#upload-resume-form" className="text-lg text-black">
          Get Started - It&apos;s is 100% Free!
        </Link>
      </Button>
      {/* <DragAndDropUpload /> */}
    </div>
  );
};
