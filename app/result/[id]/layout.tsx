import React from "react";

export default function DashboardLayout({
  children,
  leftSidebar,
}: // rightSidebar,
{
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
  // rightSidebar: React.ReactNode;
}) {
  return (
    <div
      className={`w-full flex justify-center items-start  pt-10 gap-12 px-4   `}
    >
      <div className="sticky top-20 ">{leftSidebar}</div>
      <div className="w-full ">{children}</div>
      {/* <div className=" sticky top-20">{rightSidebar}</div> */}
    </div>
  );
}
