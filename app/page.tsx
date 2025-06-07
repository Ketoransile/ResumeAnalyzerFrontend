"use client";
import DragAndDropUpload from "@/components/DragAndDropUpload";
import { Spotlight } from "@/components/ui/Spotlight";
import Image from "next/image";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { AiOutlineUpload } from "react-icons/ai";
import { RiFileCopyLine } from "react-icons/ri";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
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
