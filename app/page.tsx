"use client";
// import { Spotlight } from "@/components/ui/Spotlight";

import { Hero } from "@/components/Hero";

import UploadResume from "@/components/UploadResume";
import HowItWorksSection from "@/components/HowItWorks";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between pt-2 relative overflow-hidden min-h-screen -mx-2 sm:-mx-6 md:-mx-10 lg:-mx-20">

      {/* <Spotlight className="absolute top-0 left-0 md:-top-20 z-10 opacity-70" fill="white" /> */}

      <div className="relative z-10 w-full flex flex-col gap-32 px-2 sm:px-6 md:px-10 lg:px-20">
        <Hero />
        <HowItWorksSection />
        <UploadResume />
      </div>
    </div>
  );
}
