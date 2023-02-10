import React, { useContext } from "react";
import PageConfig from "./config-options/PageConfig";
import TypeConfig from "./config-options/TypeConfig";
import PromptConfig from "./config-options/PromptConfig";
import ChoicesConfig from "./config-options/ChoicesConfig";
import ShuffleConfig from "./config-options/ShuffleConfig";

export default function MCSidebar(props: any) {

  return (
    <>
        <PageConfig />
        <TypeConfig />
        <PromptConfig />
        <ShuffleConfig />
        <ChoicesConfig />
    </>
  );
}
