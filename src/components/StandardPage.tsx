import React from "react";
import TopNav from "./TopNav";

export default function StandardPage(props: any) {
  return (
    <div className="dark:bg-rdsDark2 min-h-screen h-full w-full dark:text-white">
      <TopNav />
      {props.children}
    </div>
  );
}
