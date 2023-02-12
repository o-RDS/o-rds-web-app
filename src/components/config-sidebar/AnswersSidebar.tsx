import React from "react";
import ChoicesConfig from "./config-options/ChoicesConfig";
import ShuffleConfig from "./config-options/ShuffleConfig";

export default function AnswersSidebar() {
    return (
        <div>
        <h3>Answers</h3>
        <ShuffleConfig />
        <ChoicesConfig />
      </div>
    )
}