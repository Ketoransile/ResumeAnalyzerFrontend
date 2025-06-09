// import React from "react";

// export default function DashboardLayout({
//   children,
//   leftSidebar,
// }: // rightSidebar,
// {
//   children: React.ReactNode;
//   leftSidebar: React.ReactNode;
//   // rightSidebar: React.ReactNode;
// }) {
//   return (
//     // <div
//     //   className={`w-full flex justify-center items-start  pt-10 gap-12 px-4   `}
//     // >
//     <div className={`w-full grid grid-cols-6  pt-10 gap-4 px-20   `}>
//       <div className="w-full col-span-2 sticky top-20 ">{leftSidebar}</div>
//       <div className="w-full col-span-4">{children}</div>
//       {/* <div className=" sticky top-20">{rightSidebar}</div> */}
//     </div>
//   );
// }
import React from "react";

export default function DashboardLayout({
  children,
  leftSidebar,
}: {
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
}) {
  return (
    // Add `min-h-screen` to ensure the main grid container takes at least the full viewport height.
    // This allows for scrolling within the document if content overflows, which is necessary for `sticky`.
    // Also, added `overflow-y-auto` to ensure this specific div manages its own vertical scrolling
    // if its content exceeds its height (though typically, the `body` or `html` handles root scrolling).
    <div className={`w-full grid grid-cols-6 pt-10 gap-4 px-20 min-h-screen`}>
      {/*
        The `leftSidebar` itself needs to be inside a container that can scroll.
        The `sticky top-20` applies to the leftSidebar div itself.
        Ensure that the content within `leftSidebar` is also long enough
        to cause scrolling if it were not sticky.
      */}
      <div className="col-span-2 h-[calc(100vh-5rem)] sticky top-20 ">
        {leftSidebar}
      </div>
      <div className="w-full col-span-4">{children}</div>
    </div>
  );
}
