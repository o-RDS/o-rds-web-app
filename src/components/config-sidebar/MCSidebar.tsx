import React, { useContext } from "react";
import GeneralSidebar from "./GeneralSidebar";
import AnswersSidebar from "./AnswersSidebar";

export default function MCSidebar(props: any) {
  return (
    <>
      <GeneralSidebar />
      <div className="h-1 w-8/12 bg-slate-500"></div>
      <AnswersSidebar />
    </>
  );
}
