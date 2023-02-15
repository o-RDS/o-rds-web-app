import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function PromptConfig() {
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
      change: true
    });
  }

  return (
    <div
      id="question-prompt"
      className="mt-3 flex flex-col items-start justify-center gap-2"
    >
      <label htmlFor="question-prompt">
        {taskQuestions["config"]["prompt"]["configPrompt"]}
      </label>
      <textarea
        placeholder="This is a question"
        className="h-20 w-full rounded-md border border-rdsOrange p-1 dark:bg-inherit"
        onChange={(e: any) => handleTitleChange(e)}
        value={taskQuestions["config"]["prompt"]["value"]}
      ></textarea>
    </div>
  );
}
