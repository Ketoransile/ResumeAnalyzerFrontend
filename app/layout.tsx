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
          {/* Global Background */}
          <div className="fixed inset-0 w-full h-full bg-black -z-50 pointer-events-none" />

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
