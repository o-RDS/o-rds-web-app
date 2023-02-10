import React from "react";
import TopNav from "./TopNav";

export default function StandardPage(props: any) {
  return (
    <>
      <TopNav />
      {props.children}
    </>
  );
}
