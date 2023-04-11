import React, { useState, useEffect } from "react";
import getDefault from "./Question";

export default function MultipleChoice(props: any) {
  // This still needs ability to handle other questions. It is not too tough to do but need a way to easily have it added in
  // this is far from finished, but each question type will have its own default config
  // the survey editor will use this when a new question is added
  const [answer, setAnswer] = useState(props.currentValue);
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

  // called when user clicks a choice, and sends the update to the question component
  function handleClick(answer: string) {
    setAnswer(answer);
    if (props.updateResponse) {
      props.updateResponse({ "#": answer });
    }
    console.log("Answer: " + answer);
  }

  // fairly obvious, this will render each choice as a radio button (can be made more pretty)
  function renderChoices() {
    return props.config.choices.value.map((choice: string, index: number) => {
      let isChecked = false;
      console.log(props.currentValue);
      if (choice === answer) {
        isChecked = true;
      } else {
        console.log("failed");
      }
      return (
        <div key={index}>
          <input
            type="radio"
            name={props.id}
            id={choice}
            value={choice}
            onChange={() => handleClick(choice)}
            defaultChecked={isChecked}
            className="accent-rdsBlue"
            required={props.require}
          />
          <label className="ml-2" htmlFor={choice}>
            {choice}
          </label>
        </div>
      );
    });
  }

  // this will render the question prompt and the choices
  return (
    <div>
      <h2 className="text-lg font-bold">
        {props.index + 1}) {props.config.prompt.value}{" "}
        {props.require && <p className="text-xl text-red-500">*</p>}
      </h2>
      {renderChoices()}
    </div>
  );
}
