"use client";
import { Spotlight } from "@/components/ui/Spotlight";

import { Hero } from "@/components/Hero";

import HowItWorks from "@/components/HowItWorks";
import UploadResume from "@/components/UploadResume";
export default function Home() {
  return (
    <div className="flex flex-col gap-32 items-center justify-between pt-2 ">
      <Spotlight className="absolute top-0" />
      <Hero />
      <HowItWorks />
      <UploadResume />
    </div>
  );
}
