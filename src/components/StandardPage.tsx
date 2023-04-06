import React from "react";
import TopNav from "./TopNav";

export default function StandardPage(props: any) {
  return (
    <div className="overflow-x-hidden dark:bg-rdsDark2 w-full min-h-screen dark:text-white">
      <TopNav />
      {props.children}
    </div>
  );
}
