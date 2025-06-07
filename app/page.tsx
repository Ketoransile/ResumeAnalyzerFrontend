"use client";
import DragAndDropUpload from "@/components/DragAndDropUpload";
import { Spotlight } from "@/components/ui/Spotlight";
import Image from "next/image";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
export default function Home() {
  return (
    <div className="flex items-start justify-between pt-2 ">
      <Spotlight className="absolute top-0" />
      <div className=" flex flex-col gap-6 items-center justify-center pt-32">
        <h1 className="w-2/3 text-6xl text-center font-bold leading-relaxed ">
          AI Knows What Recruiters Want —{" "}
          <Highlight className="text-black dark:text-white">
            Does Your Resume?
          </Highlight>
        </h1>
        <h2 className="text-md text-center w-1/2">
          Let our AI-powered resume analyzer review your resume the way a
          recruiter would. Instantly get a score along with detailed, actionable
          tips to improve your chances of landing interviews—completely free.
        </h2>
        <DragAndDropUpload />
      </div>
      {/* <div className="">
        <Image
          src="/heroImage.svg"
          width={1000}
          height={1000}
          alt="heroImage"
        />
      </div> */}
    </div>
  );
}
