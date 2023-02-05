import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function MCSidebar(props: any) {
  const task = useContext(TasksContext);
  const taskQuestions = task['survey']['questions'][task['question']]
  const dispatch = useContext(TasksDispatchContext);
  const choicesArray: any = taskQuestions.config.choices.value.map(
    (choice: any) => <li key={choice}>{choice}</li>
  );

  function handleTitleChange(e: any) {
    let test: any = task;
    test["survey"]["questions"][test["question"]]["config"]["prompt"]["value"] =
      e.target.value;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleCheckChange(e: any) {
    let test: any = task;
    test["survey"]["questions"][test["question"]]["config"]["shuffle"][
      "value"
    ] = e.target.checked;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: test["question"],
    });
  }

  return (
    <>
      <div className="mt-3 flex flex-col items-center justify-center">
        <label>Page</label>
        <div className="flex flex-row gap-2">
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white">
            -
          </button>
          <p className="text-lg">{taskQuestions['page']}</p>
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white">
            +
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center justify-center">
        <label>
          {
            taskQuestions["config"]["prompt"][
              "configPrompt"
            ]
          }
        </label>
        <input
          type="text"
          placeholder="This is a question"
          className="w-3/5 rounded-sm border border-rdsOrange"
          onChange={(e: any) => handleTitleChange(e)}
          defaultChecked={taskQuestions.config.shuffle.value}
        ></input>
      </div>
      <div>
        <label>
          {
            taskQuestions["config"]["shuffle"][
              "configPrompt"
            ]
          }
        </label>
        <input type="checkbox" onChange={(e) => handleCheckChange(e)}></input>
      </div>
      <div className="flex flex-col items-center justify-center">
        <label>
          {
            task["survey"]["questions"][task["question"]]["config"]["choices"][
              "configPrompt"
            ]
          }
        </label>
        <input
          type="text"
          placeholder="Add Choices Here"
          className="w-3/5 rounded-sm border border-rdsOrange"
        ></input>
        <ul>{choicesArray}</ul>
      </div>
    </>
  );
}
