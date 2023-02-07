import React, { useContext } from "react";
import PageConfig from "./config-options/PageConfig";
import PromptConfig from "./config-options/PromptConfig";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function ShortAnswerSidebar(props: any) {
  const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);

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

  return (
    <>
      {/* <div className="mt-3 flex flex-col items-center justify-center">
        <label>Page</label>
        <div className="flex flex-row gap-2">
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white">
            -
          </button>
          <p className="text-lg">{taskQuestions["page"]}</p>
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white">
            +
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center justify-center">
        <label>{taskQuestions["config"]["prompt"]["configPrompt"]}</label>
        <input
          type="text"
          placeholder="This is a question"
          className="w-3/5 rounded-sm border border-rdsOrange"
          onChange={(e: any) => handleTitleChange(e)}
          value={taskQuestions['config']['prompt']['value']}
        ></input>
      </div> */}
      {/* <div> */}
        <PageConfig />
        <PromptConfig />
      {/* </div> */}
    </>
  );
}
