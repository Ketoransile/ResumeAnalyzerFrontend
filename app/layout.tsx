import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElevateCV",
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
      <html lang="en" className="dark">
        <body
          className={`${montserrat.className} antialiased bg-black text-white relative`}
        >
          {/* Global Modern Background Gradient */}
          <div className="fixed inset-0 w-full h-full bg-black -z-50 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[800px] md:h-[600px] bg-purple-500/10 rounded-full blur-[100px] opacity-30" />
          </div>

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
