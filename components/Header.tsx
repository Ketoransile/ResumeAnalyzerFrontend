// "use client";

// import Link from "next/link";
// import { Button } from "./ui/button";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { FiBarChart2 } from "react-icons/fi";
// export const Header = () => {
//   const pathname = usePathname();

//   const homePagePath = "/";

//   const handleHeaderLinkClick = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     sectionId: string
//   ) => {
//     const targetHref = e.currentTarget.getAttribute("href");
//     const targetPath = targetHref ? targetHref.split("#")[0] || "/" : "/";

//     if (pathname === targetPath && sectionId) {
//       e.preventDefault();
//       const targetElement = document.getElementById(sectionId);
//       if (targetElement) {
//         targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     }
//   };
//   return (
//     <div className="flex sticky border-b border-neutral-900  backdrop-blur-lg  top-0  items-center justify-between py-4  max-sm:px-2 sm:px-6 md:px-10  lg:px-20 z-100">
//       <Link href="/" className="text-2xl font-bold hover:scale-105">
//         Hired.ai
//       </Link>
//       <div className="flex items-center justify-center gap-10 text-sm text-neutral-400 ">
//         <Link
//           // href={`${homePagePath}#footer-section`}
//           href="/about"
//           onClick={(e) => handleHeaderLinkClick(e, "footer-section")}
//           className={`cursor-pointer text-neutral-500 hover:text-white transition-colors duration-200 ${
//             pathname === "/about" ? "text-white" : ""
//           }`}
//         >
//           About
//         </Link>
//         <Link
//           href={`${homePagePath}#howItWorks`}
//           onClick={(e) => handleHeaderLinkClick(e, "howItWorks")}
//           scroll={false}
//           className="cursor-pointer text-neutral-500 hover:text-white transition-colors duration-200"
//         >
//           How it Works
//         </Link>
//         {/* <Link
//           href="/"
//           className="cursor-pointer text-neutral-500 hover:text-white transition-colors duration-200"
//         >
//           Pricing
//         </Link> */}
//         <Link
//           href="/result"
//           className={`cursor-pointer text-neutral-500 hover:text-white transition-colors duration-200 ${
//             pathname.includes("/result") ? "text-white" : ""
//           }`}
//         >
//           My Analyses
//         </Link>
//       </div>

//       <div className="flex items-center justify-center gap-4">
//         <SignedIn>
//           <UserButton>
//             <UserButton.MenuItems>
//               <UserButton.Link
//                 label="My Analyses"
//                 labelIcon={<FiBarChart2 size={20} className="text-black" />}
//                 href="/result"
//               />
//             </UserButton.MenuItems>
//           </UserButton>
//         </SignedIn>
//         <SignedOut>
//           {/* <Link href="/" className=" font-bold">
//             Login
//           </Link>

//           <Button className="bg-blue-600">
//             <Link href="/">Signup for free</Link>
//           </Button> */}
//           <Button className="px-4 bg-white text-black hover:bg-neutral-400 cursor-pointer">
//             {/* <SignInButton /> */}
//             <Link href="/sign-in">Sign in</Link>
//           </Button>
//           {/* <SignUpButton /> */}
//         </SignedOut>
//       </div>
//     </div>
//   );
// };
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { FiBarChart2 } from "react-icons/fi";
import { useState, useEffect } from "react";

export const Header = () => {
  const pathname = usePathname();
  const homePagePath = "/";

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== homePagePath) {
      setActiveSectionId(null);
      return;
    }

    const sections = ["howItWorks", "footer-section"];

    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        } else if (activeSectionId === entry.target.id) {
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [pathname, activeSectionId]);

  const handleHeaderLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    const targetHref = e.currentTarget.getAttribute("href");
    const targetPath = targetHref ? targetHref.split("#")[0] || "/" : "/";

    if (pathname === targetPath && sectionId) {
      e.preventDefault();
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSectionId(sectionId); // Immediately set active section on click
      }
    }
  };

  return (
    <div className="flex sticky border-b border-neutral-900 bg-black md:backdrop-blur-2xl top-0 items-center justify-between py-4  px-4 sm:px-6 md:px-10  lg:px-20 z-100">
      <Link
        href="/"
        className="text-lg md:text-xl lg:text-2xl font-bold hover:scale-105"
      >
        Hired.ai
      </Link>
      <div className="flex items-center justify-center gap-10 text-sm text-neutral-400">
        {/* <Link
          href={`${homePagePath}#howItWorks`}
          onClick={(e) => handleHeaderLinkClick(e, "howItWorks")}
          scroll={false}
          className={`cursor-pointer transition-colors duration-200 ${
            pathname === homePagePath && activeSectionId === "howItWorks"
              ? "text-neutral-300 font-bold" // Active color
              : "text-neutral-500 hover:text-white" // Non-active color
          }`}
        >
          How it Works
        </Link> */}
        <Link
          href="/result"
          className={`cursor-pointer transition-colors duration-200 ${
            pathname === "/result"
              ? "text-white font-bold" // Active color
              : "text-neutral-400 hover:text-white" // Non-active color
          }`}
        >
          My Analyses
        </Link>{" "}
        <Link
          href={`${homePagePath}#footer-section`}
          onClick={(e) => handleHeaderLinkClick(e, "footer-section")}
          className={`cursor-pointer transition-colors duration-200 ${
            pathname === homePagePath && activeSectionId === "footer-section"
              ? "text-white font-bold" // Active color
              : "text-neutral-400 hover:text-white" // Non-active color
          }`}
        >
          About
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4">
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
          <Button className="px-4 bg-white text-black hover:bg-neutral-400 cursor-pointer">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};
