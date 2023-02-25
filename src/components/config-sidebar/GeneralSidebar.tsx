import React from "react";
import PageConfig from "./config-options/PageConfig";
import PromptConfig from "./config-options/PromptConfig";
import TypeConfig from "./config-options/TypeConfig";
import RequiredConfig from "./config-options/RequiredConfig";

export default function GeneralSidebar() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold">General</h3>
      <PageConfig />
      <RequiredConfig />
      <TypeConfig />
      <PromptConfig />
    </div>
  );
}
