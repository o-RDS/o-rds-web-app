import React from "react";
import TopNav from "./TopNav";

export default function StandardPage(props: any) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-rdsDark2 dark:text-white">
      <TopNav />
      {props.children}
    </div>
  );
}
