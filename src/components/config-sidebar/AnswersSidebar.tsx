import React from "react";
import ChoicesConfig from "./config-options/ChoicesConfig";
import ShuffleConfig from "./config-options/ShuffleConfig";

export default function AnswersSidebar() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold">Answers</h3>
      <ShuffleConfig />
      <ChoicesConfig />
    </div>
  );
}
