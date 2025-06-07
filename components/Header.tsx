import Link from "next/link";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export const Header = () => {
  return (
    <div className="flex sticky border-b border-neutral-900  backdrop-blur-lg z-10 top-0  items-center justify-between py-4  max-sm:px-2 sm:px-6 md:px-10  lg:px-20">
      <Link href="/" className="text-2xl font-bold">
        NeuroCV
      </Link>
      <div className="flex items-center justify-center gap-10 text-sm text-neutral-400 ">
        <Link href="/" className="">
          About
        </Link>
        <Link href="/">How it Works</Link>
        <Link href="/">Pricing</Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* <Button className=" text-blue-600"> */}
        <SignedIn>
          <UserButton />
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
