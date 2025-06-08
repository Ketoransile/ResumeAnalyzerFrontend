import React from "react";

export default function DashboardLayout({
  children,
  leftSidebar,
  rightSidebar,
}: {
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
  rightSidebar: React.ReactNode;
}) {
  return (
    <div className={`w-full flex justify-between items-start  pt-10 gap-10   `}>
      <div className="  sticky top-20 ">{leftSidebar}</div>
      <div className="">{children}</div>
      <div className=" sticky top-20">{rightSidebar}</div>
    </div>
  );
}
