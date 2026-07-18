import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

// Primary body font – clean, humanist, legible at all sizes
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display / editorial font – used for headings with italic flair
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ElevateCV | AI-Powered Resume Analyzer",
  description:
    "ElevateCV uses AI to score your resume like a recruiter would. Get instant keyword matching, skill gap analysis, and tailored tips to land more interviews — completely free.",
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
          className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#080808] text-white relative min-h-screen`}
        >
          {/* ── Global Background ── */}
          <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
            {/* Fine dot grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
              }}
            />

            {/* Primary violet glow – top center */}
            <div
              className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px]"
              style={{ background: "rgba(124,58,237,0.09)" }}
            />

            {/* Secondary indigo glow – mid left */}
            <div
              className="absolute top-[35%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px]"
              style={{ background: "rgba(99,102,241,0.05)", animationDuration: "10s" }}
            />

            {/* Tertiary glow – lower right */}
            <div
              className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full blur-[130px]"
              style={{ background: "rgba(139,92,246,0.04)" }}
            />
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
