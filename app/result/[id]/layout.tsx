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
      className={`w-full flex flex-col xl:grid grid-cols-6 pt-10 gap-4 px-4 lg:px-10 xl:px-20 min-h-screen`}
    >
      <div className="col-span-2 xl:h-[calc(100vh-5rem)] sticky top-20 ">
        {leftSidebar}
      </div>
      <div className="w-full col-span-4">{children}</div>
    </div>
  );
}
