// src/app/about/page.tsx or src/components/AboutPage.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14 lg:py-16 max-w-4xl bg-black text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-100 mb-6 md:mb-10 leading-relaxed">
        <span className="text-white">Hired.ai</span>: AI-Powered Resume Analyzer{" "}
        <span className="text-purple-400">with GPT-4.1</span>
      </h1>

      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-5">
          Empowering Your Job Search Journey
        </h2>
        <p className="text-base text-gray-300 leading-relaxed mb-3">
          Welcome to{" "}
          <strong className="font-semibold text-white">Hired.ai</strong>, the
          cutting-edge platform designed to revolutionize how job seekers tailor
          their resumes and understand their fit for desired roles. In
          today&apos;s competitive job market, simply having a great resume
          isn&apos;t enough – it needs to speak directly to the job you&apos;re
          applying for. That&apos;s where we come in.
        </p>
      </section>

      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-5">
          The Challenge for Job Seekers
        </h2>
        <p className="text-base text-gray-300 leading-relaxed">
          Crafting a resume that truly resonates with a job description is a
          time-consuming and often daunting task. It requires meticulous
          analysis, identifying keywords, understanding subtle nuances in role
          requirements, and effectively showcasing your most relevant skills and
          experiences. Many qualified candidates miss opportunities simply
          because their resume doesn&apos;t clearly highlight their suitability
          for a specific position.
        </p>
      </section>

      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-5">
          Our Solution: Intelligent Resume-to-Job Matching
        </h2>
        <p className="text-base text-gray-300 leading-relaxed mb-5">
          <strong className="font-semibold text-white">Hired.ai</strong>{" "}
          empowers you to bridge this gap with the power of advanced Artificial
          Intelligence. We utilize{" "}
          <strong className="font-semibold text-purple-400">GPT-4.1</strong>,
          the latest in large language model technology, to provide unparalleled
          insights into how well your resume aligns with any given job
          description.
        </p>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4">
          How It Works
        </h3>
        <ol className="list-decimal list-inside text-base text-gray-300 space-y-3">
          <li>
            <strong className="font-medium text-white">
              Upload Your Resume:
            </strong>{" "}
            Simply upload your resume in a common document format (e.g., PDF,
            DOCX).
          </li>
          <li>
            <strong className="font-medium text-white">
              Paste the Job Description:
            </strong>{" "}
            Copy and paste the full job description into our analysis tool.
          </li>
          <li>
            <strong className="font-medium text-white">
              Get Instant Insights:
            </strong>{" "}
            Our GPT-4.1 powered engine goes to work, performing a deep,
            contextual analysis. You&apos;ll receive:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                A comprehensive{" "}
                <strong className="font-medium text-white">match score</strong>{" "}
                indicating overall relevance.
              </li>
              <li>
                Identified{" "}
                <strong className="font-medium text-white">
                  key skills and experiences
                </strong>{" "}
                from the job description that are present (or or missing) in
                your resume.
              </li>
              <li>
                Suggestions for{" "}
                <strong className="font-medium text-white">keywords</strong> and{" "}
                <strong className="font-medium text-white">phrases</strong> you
                might consider incorporating to strengthen your application.
              </li>
              <li>
                Analysis of{" "}
                <strong className="font-medium text-white">
                  tone and emphasis
                </strong>{" "}
                to help you refine your narrative.
              </li>
              <li>
                A breakdown of your{" "}
                <strong className="font-medium text-white">strengths</strong>{" "}
                relative to the job requirements.
              </li>
              <li>
                Identification of potential{" "}
                <strong className="font-medium text-white">skill gaps</strong>{" "}
                that you could address or explain.
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-5">
          Key Benefits
        </h2>
        <ul className="list-disc list-inside text-base text-gray-300 space-y-3">
          <li>
            <strong className="font-medium text-white">
              Boost Your Relevance:
            </strong>{" "}
            Understand exactly what hiring managers are looking for and adjust
            your resume to stand out.
          </li>
          <li>
            <strong className="font-medium text-white">Save Time:</strong>{" "}
            Eliminate hours of manual comparison and analysis. Get actionable
            insights in seconds.
          </li>
          <li>
            <strong className="font-medium text-white">
              Identify Gaps & Opportunities:
            </strong>{" "}
            Discover areas where your resume could be stronger or where you
            might need to highlight different experiences.
          </li>
          <li>
            <strong className="font-medium text-white">Gain Confidence:</strong>{" "}
            Apply with the assurance that your resume is optimized for the
            specific role, increasing your chances of landing an interview.
          </li>
          <li>
            <strong className="font-medium text-white">
              Powered by Cutting-Edge AI:
            </strong>{" "}
            Leverage the advanced understanding and contextual reasoning
            capabilities of GPT-4.1 to get the most accurate and nuanced
            feedback.
          </li>
        </ul>
      </section>

      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-5">
          Our Vision
        </h2>
        <p className="text-base text-gray-300 leading-relaxed">
          At <strong className="font-semibold text-white">Hired.ai</strong>, our
          vision is to democratize career success by providing accessible,
          intelligent tools that empower every job seeker. We believe that with
          the right insights, everyone can better articulate their value and
          connect with the opportunities they deserve.
        </p>
      </section>

      <div className="text-center">
        <p className="text-lg md:text-xl font-bold text-gray-200 mb-6">
          Ready to take control of your job search?
        </p>
        <Button className="text-black font-bold hover:bg-neutral-400 hover:text-black py-6 bg-white px-8 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-500">
          <Link href="/" className="inline-block  ">
            Try Hired.ai Now!
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
