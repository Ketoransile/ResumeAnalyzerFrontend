"use client";
import { Spotlight } from "@/components/ui/Spotlight";

import { Hero } from "@/components/Hero";

import UploadResume from "@/components/UploadResume";
import HowItWorksSection from "@/components/HowItWorks";
export default function Home() {
  return (
    <div className="flex flex-col gap-32 items-center justify-between pt-2 ">
      <Spotlight className="absolute top-0" />
      <Hero />
      <HowItWorksSection />
      <UploadResume />
    </div>
  );
}
