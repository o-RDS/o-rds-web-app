import React, { useState, useEffect } from "react";
import getDefault from "./Question";

export default function FillInTheBlank(props: any) {
  // this is far from finished, but each question type will have its own default config
  // the survey editor will use this when a new question is added
  const [answer, setAnswer] = useState("");
  const [config, setConfig] = useState({
    prompt: {
      value: "",
      configPrompt: "Question Prompt",
      type: "string",
    },
    shuffle: {
      value: false,
      configPrompt: "Shuffle?",
      type: "boolean",
    },
    choices: {
      value: [""],
      configPrompt: "Question Prompt",
      type: "stringArray",
    },
  });
  // console.log(props.currentValue);

  useEffect(() => {
    if (typeof props.currentValue !== "undefined") {
      setAnswer(props.currentValue);
    } else {
      setAnswer("");
    }
  }, []);

  // called when user clicks a choice, and sends the update to the question component
  function handleClick(answer: string) {
    if (props.updateResponse) {
      props.updateResponse({ "#": answer });
      setAnswer(answer);
    }
    console.log("Answer: " + answer);
  }

  // fairly obvious, this will render each choice as a radio button (can be made more pretty)
  // TODO: make it so answers are reported up to the survey component (function chain)
  function renderChoices() {
    return (
      <div className="flex flex-col gap-2">
        <p>{props.config.prompt.value}</p>
        <input
          placeholder="Place Answer Here"
          value={answer}
          onChange={(e) => handleClick(e.target.value)}
          className="rounded-md border-2 border-rdsBlue pl-1 pr-1 md:w-2/5"
        ></input>
      </div>
    );
  }

  // this will render the question prompt and the choices
  return (
    <div>
      <h2 className="text-lg font-bold">
        {props.index + 1}) Fill In The Blank
      </h2>
      {renderChoices()}
    </div>
  );
}
