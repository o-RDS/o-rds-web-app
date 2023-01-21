import React, { useState, useEffect } from "react";
import getDefault from "./Question";

export default function ShortAnswer(props: any) {
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

  useEffect(() => {
    if (typeof props.currentValue !== "undefined") {
      setAnswer(props.currentValue);
    } else {
      setAnswer("Broken");
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
      <div>
        <textarea
          placeholder="This is a place for text"
          value={answer}
          onChange={(e) => handleClick(e.target.value)}
          className="border-2 border-rdsBlue rounded-md"
        ></textarea>
      </div>
    );
  }

  // this will render the question prompt and the choices
  return (
    <div>
      <h2 className="text-lg font-bold">{props.index + 1}) {props.config.prompt.value}</h2>
      {renderChoices()}
    </div>
  );
}
