import React, { useState, useEffect } from "react";
import getDefault from "./Question";
import ShortAnswer from "./ShortAnswer";

export default function Checkbox(props: any) {
  // this is far from finished, but each question type will have its own default config
  // the survey editor will use this when a new question is added
  let answerArray: string[] = [];
  if (props.currentValue) {
    answerArray = props.currentValue;
  }
  //   let answerArray: string[] = props.currentValue;
  console.log(answerArray);
  const [answer, setAnswer] = useState("");
  //   const [isChecked, setIsChecked] = useState(false);
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

  useEffect(() => {});

  // called when user clicks a choice, and sends the update to the question component
  function handleClick(answer: any) {
    // if ()
    console.log(answerArray);
    if (props.updateResponse) {
      if (answerArray.includes(answer)) {
        let index = answerArray.indexOf(answer);
        answerArray.splice(index, 1);
        // const filterArray: string[] = answerArray.filter((choice) => choice != answer);
        props.updateResponse({ "#": answerArray });
      } else {
        answerArray.push(answer);
        props.updateResponse({ "#": answerArray });
      }
    }
    console.log(answerArray);
    console.log("Answer: " + answer);
  }

  // fairly obvious, this will render each choice as a radio button (can be made more pretty)
  // TODO: make it so answers are reported up to the survey component (function chain)
  function renderChoices() {
    return props.config.choices.value.map((choice: string, index: number) => {
      let isChecked = false;
      if (props.currentValue) {
        if (props.currentValue[index] === choice) {
          isChecked = true;
        }
      }
      console.log(isChecked);
      return (
        <div key={index}>
          <input
            type="checkbox"
            id={choice + index.toString()}
            name={props.id}
            value={choice}
            onChange={() => handleClick(choice)}
            defaultChecked={isChecked}
            className="accent-rdsBlue"
          />
          <label htmlFor={choice + index.toString()} className="ml-2">
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
