import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function PageConfig() {
    const task = useContext(TasksContext);
    const taskQuestions = task["survey"]["questions"][task["question"]];
    const dispatch = useContext(TasksDispatchContext);

    function handlePageChange(page: number) {
      let test: any = task;
      test["survey"]["questions"][test["question"]]["page"] =
        page;
      dispatch({
        type: "question-prompt",
        questions: test["survey"],
        question: task["question"],
      });
    }

    return (
        <div className="mt-3 flex flex-col items-start justify-center gap-2">
        <label>Page</label>
        <div className="flex flex-row w-2/3 justify-between gap-2 bg-rdsOrange rounded-full">
          <button className="h-8 w-1/3 text-lg rounded-l-full bg-rdsOrange text-white border-r border-r-white" onClick={() => handlePageChange(taskQuestions['page'] - 1)}>
            -
          </button>
          <p className="text-lg h-8">{taskQuestions["page"]}</p>
          <button className="text-lg h-8 w-1/3 rounded-r-full bg-rdsOrange text-white border-l border-l-white" onClick={() => handlePageChange(taskQuestions['page'] + 1)}>
            +
          </button>
        </div>
      </div>
    )
}