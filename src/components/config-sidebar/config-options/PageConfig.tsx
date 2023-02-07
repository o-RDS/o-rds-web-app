import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function PageConfig() {
    const task = useContext(TasksContext);
    const taskQuestions = task["survey"]["questions"][task["question"]];
    const dispatch = useContext(TasksDispatchContext);
    return (
        <div className="mt-3 flex flex-col items-center justify-center">
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
    )
}