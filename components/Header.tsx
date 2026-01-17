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
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/70">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-20">
        {/* Brand */}
        <Link href="/" className="relative z-50 flex items-center gap-2 group">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400 group-hover:to-white transition-all duration-300">
            ElevateCV
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-all duration-200 hover:text-white relative",
              pathname === "/about" ? "text-white" : "text-neutral-400"
            )}
          >
            About
            {pathname === "/about" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </Link>

          <SignedIn>
            <Link
              href="/result"
              className={cn(
                "text-sm font-medium transition-all duration-200 hover:text-white relative",
                pathname === "/result" ? "text-white" : "text-neutral-400"
              )}
            >
              My Analyses
              {pathname === "/result" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
              )}
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
                className="text-neutral-300 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="bg-white text-black hover:bg-neutral-200 transition-colors font-medium"
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
          className="md:hidden relative z-50 p-2 -mr-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-black overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2 pb-8">
              <Link
                href="/about"
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl text-base font-medium transition-colors",
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
                    "flex items-center justify-between p-4 rounded-xl text-base font-medium transition-colors",
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
                <div className="flex items-center gap-3 p-4">
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
                    className="w-full justify-center h-12 text-base font-medium border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white"
                    asChild
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    className="w-full justify-center h-12 text-base font-medium bg-white text-black hover:bg-neutral-200"
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
