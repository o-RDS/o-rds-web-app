import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function ChoicesConfig() {
  const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);

  function handleChoicesChange(index: number, e: any) {
    let test: any = task;
    test["survey"]["questions"][test["question"]]["config"]["choices"]["value"][
      index
    ] = e.target.value;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function addChoice(action: string) {
    let test: any = task;
    switch (action) {
      case "pop": {
        test["survey"]["questions"][test["question"]]["config"]["choices"][
          "value"
        ].pop();
        dispatch({
          type: "question-prompt",
          questions: test["survey"],
          question: task["question"],
        });
        break;
      }
      case "push": {
        test["survey"]["questions"][test["question"]]["config"]["choices"][
          "value"
        ].push("New Option");
        dispatch({
          type: "question-prompt",
          questions: test["survey"],
          question: task["question"],
        });
        break;
      }
    }
  }
  const choicesArray: any = taskQuestions.config.choices.value.map(
    (choice: any, index: number) => (
      <li key={index}>
        <input
          value={choice}
          onChange={(e) => handleChoicesChange(index, e)}
          className="w-full border-b-2 border-gray-200 transition-all focus:border-b-rdsBlue focus:outline-none dark:bg-rdsDarkAccent2"
          placeholder="Enter Choice Here"
        ></input>
        <br></br>
      </li>
    )
  );
  return (
    <div className="flex flex-col items-start justify-center gap-5">
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <label>{taskQuestions["config"]["choices"]["configPrompt"]}</label>
        <div className="flex w-2/3 flex-row justify-between gap-2 rounded-full bg-rdsOrange">
          <button
            className="h-8 w-1/3 rounded-l-full border-r border-r-white bg-rdsOrange text-lg text-white"
            onClick={() => addChoice("pop")}
          >
            -
          </button>
          <p className="text-lg text-white">
            {taskQuestions["config"]["choices"]["value"].length}
          </p>
          <button
            className="h-8 w-1/3 rounded-r-full border-l border-l-white bg-rdsOrange text-lg text-white"
            onClick={() => addChoice("push")}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4>{taskQuestions["config"]["choices"]["editablePrompt"]}</h4>
        <ul className="flex flex-col gap-2">{choicesArray}</ul>
      </div>
    </div>
  );
}
