import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hired.ai",
  description:
    "Hired.ai: Get your resume analyzed by our AI-powered tool with GPT-4.1. Instantly see your match score, skill gaps, and get actionable tips to land more interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${montserrat.className} antialiased  bg-black text-white`}
        >
          <Header />
          <main className="max-sm:px-2 sm:px-6 md:px-10  lg:px-20 ">
            {/* <main className=""> */}
            {children}
            <Toaster />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
