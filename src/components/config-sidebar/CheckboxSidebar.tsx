import React, { useContext } from "react";
import GeneralSidebarCheck from "./GeneralSidebarCheck";
import AnswersSidebar from "./AnswersSidebar";

export default function CheckboxSidebar(props: any) {
  return (
    <>
      <GeneralSidebarCheck />
      <div className="h-1 w-8/12 bg-slate-500"></div>
      <AnswersSidebar />
    </>
  );
}
