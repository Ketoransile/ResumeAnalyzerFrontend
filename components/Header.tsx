"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { FiBarChart2 } from "react-icons/fi";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl border border-white/8 bg-[#080808]/80 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/90 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <Link href="/" className="relative z-50 flex items-center gap-2.5 group">
          <div className="h-8 w-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-black text-sm">E</span>
          </div>
          <span className="text-[1.1rem] font-bold tracking-tight text-white group-hover:text-neutral-200 transition-all duration-300">
            ElevateCV
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium tracking-wide transition-all duration-200 hover:text-white relative py-1 px-2 rounded-md hover:bg-white/5",
              pathname === "/about" ? "text-white bg-white/5" : "text-neutral-400"
            )}
          >
            About
          </Link>

          <SignedIn>
            <Link
              href="/result"
              className={cn(
                "text-sm font-medium tracking-wide transition-all duration-200 hover:text-white relative py-1 px-2 rounded-md hover:bg-white/5",
                pathname === "/result" ? "text-white bg-white/5" : "text-neutral-400"
              )}
            >
              My Analyses
            </Link>
          </SignedIn>

          <div className="flex items-center gap-4 ml-2 pl-4 border-l border-white/10">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-white/10 hover:ring-indigo-500/50 transition-all duration-300",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Analyses"
                    labelIcon={<FiBarChart2 size={16} />}
                    href="/result"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
            <SignedOut>
              <Button
                variant="ghost"
                className="text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="bg-white text-black hover:bg-neutral-100 transition-all duration-200 font-semibold shadow-md shadow-white/10 px-5 rounded-xl border-0 text-sm"
                asChild
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </SignedOut>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-50 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-2xl rounded-b-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2 pb-6">
              <Link
                href="/about"
                className={cn(
                  "flex items-center justify-between p-3.5 rounded-xl text-base font-medium transition-colors",
                  pathname === "/about"
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
              >
                About
              </Link>
              <SignedIn>
                <Link
                  href="/result"
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-xl text-base font-medium transition-colors",
                    pathname === "/result"
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  My Analyses
                  <FiBarChart2 className="w-5 h-5 opacity-50" />
                </Link>
              </SignedIn>

              <div className="my-2 border-t border-white/10" />

              <SignedIn>
                <div className="flex items-center gap-3 p-3">
                  <UserButton afterSignOutUrl="/" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      Account Settings
                    </span>
                    <span className="text-xs text-neutral-500">
                      Manage your profile
                    </span>
                  </div>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button
                    variant="outline"
                    className="w-full justify-center h-11 text-sm font-medium border-white/10 bg-transparent text-white hover:bg-white/5"
                    asChild
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    className="w-full justify-center h-11 text-sm font-semibold bg-white text-black hover:bg-neutral-100 shadow-md border-0"
                    asChild
                  >
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </div>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
