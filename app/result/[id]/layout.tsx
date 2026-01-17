import React from "react";

export default function DashboardLayout({
  children,
  leftSidebar,
}: {
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
}) {
  return (
    <div
      className={`w-full relative min-h-screen`}
    >

      <div className="relative z-10 w-full flex flex-col xl:grid grid-cols-6 xl:pt-10 gap-4 xl:gap-20">
        <div className="col-span-2 xl:h-[calc(100vh-5rem)] sticky  max-xl:top-16 xl:top-20 ">
          {leftSidebar}
        </div>
        <div className="w-full col-span-4">{children}</div>
      </div>
    </div>
  );
}
