"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { FiBarChart2 } from "react-icons/fi";
export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const homePagePath = "/";

  const handleHeaderLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    const targetHref = e.currentTarget.getAttribute("href"); // Get the href attribute (e.g., "/#howItWorks")
    const targetPath = targetHref ? targetHref.split("#")[0] || "/" : "/"; // Extract the path part (e.g., "/")

    // Check if the link points to the current page AND has a hash
    if (pathname === targetPath && sectionId) {
      e.preventDefault(); // Prevent the default instant jump
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth scroll to the element
      }
    }
    // If it's a different page or no hash, let <Link> handle the navigation normally.
    // The useEffect on the target page will then handle the scroll.
  };
  return (
    <div className="flex sticky border-b border-neutral-900  backdrop-blur-lg  top-0  items-center justify-between py-4  max-sm:px-2 sm:px-6 md:px-10  lg:px-20 z-100">
      <Link href="/" className="text-2xl font-bold">
        Hired.ai
      </Link>
      <div className="flex items-center justify-center gap-10 text-sm text-neutral-400 ">
        <Link
          href={`${homePagePath}#footer-section`}
          onClick={(e) => handleHeaderLinkClick(e, "footer-section")}
          className="cursor-pointer text-neutral-300 hover:text-white transition-colors duration-200"
        >
          About
        </Link>
        <Link
          href={`${homePagePath}#howItWorks`}
          onClick={(e) => handleHeaderLinkClick(e, "howItWorks")}
          scroll={false}
          className="cursor-pointer text-neutral-300 hover:text-white transition-colors duration-200"
        >
          How it Works
        </Link>
        <Link
          href="/"
          className="cursor-pointer text-neutral-300 hover:text-white transition-colors duration-200"
        >
          Pricing
        </Link>
        <Link
          href="/result"
          className="cursor-pointer text-neutral-300 hover:text-white transition-colors duration-200"
        >
          My Analyses
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* <Button className=" text-blue-600"> */}
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Analyses"
                labelIcon={<FiBarChart2 size={20} className="text-black" />}
                href="/result"
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <SignedOut>
          {/* <Link href="/" className=" font-bold">
            Login
          </Link>
 
          <Button className="bg-blue-600">
            <Link href="/">Signup for free</Link>
          </Button> */}
          <Button className="px-4 bg-white text-black hover:bg-neutral-400 cursor-pointer">
            {/* <SignInButton /> */}
            <Link href="/sign-in">Sign in</Link>
          </Button>
          {/* <SignUpButton /> */}
        </SignedOut>
      </div>
    </div>
  );
};
