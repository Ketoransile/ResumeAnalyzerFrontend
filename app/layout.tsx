import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ElevateCV | AI powered Resume Analyzer",
  description:
    "ElevateCV: Get your resume analyzed by our AI-powered tool with GPT-5. Instantly see your match score, skill gaps, and get actionable tips to land more interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark scroll-smooth">
        <body
          className={`${plusJakartaSans.variable} ${outfit.variable} font-sans antialiased bg-black text-white relative min-h-screen`}
        >
          {/* Global Background Grid & Glows */}
          <div className="fixed inset-0 w-full h-full bg-black -z-50 pointer-events-none overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            {/* Blurred Glowing Blobs */}
            <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[130px]" />
            <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
          </div>

          <Header />
          <main className="max-sm:px-2 sm:px-6 md:px-10 lg:px-20 pt-28">
            {children}
            <Toaster />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

