import React, { useContext } from "react";
import PageConfig from "./config-options/PageConfig";
import TypeConfig from "./config-options/TypeConfig";
import PromptConfig from "./config-options/PromptConfig";

export default function FillBlankSidebar(props: any) {

  return (
    <>
        <PageConfig />
        <TypeConfig />
        <PromptConfig />
    </>
  );
}
