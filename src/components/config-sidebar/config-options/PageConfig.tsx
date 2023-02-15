import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function PageConfig() {
  const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);

  function handlePageChange(page: number) {
    let test: any = task;
    test["survey"]["questions"][test["question"]]["page"] = page;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: task["question"],
    });
  }

  return (
    <div className="mt-3 flex flex-col items-start justify-center gap-2">
      <label>Page</label>
      <div className="flex w-2/3 flex-row justify-between gap-2 rounded-full bg-rdsOrange">
        <button
          className="h-8 w-1/3 rounded-l-full border-r border-r-white bg-rdsOrange text-lg text-white"
          onClick={() => handlePageChange(taskQuestions["page"] - 1)}
        >
          -
        </button>
        <p className="h-8 text-lg text-white">{taskQuestions["page"]}</p>
        <button
          className="h-8 w-1/3 rounded-r-full border-l border-l-white bg-rdsOrange text-lg text-white"
          onClick={() => handlePageChange(taskQuestions["page"] + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
