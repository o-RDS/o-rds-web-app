import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function ChoicesConfig() {
    const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);
  const choicesArray: any = taskQuestions.config.choices.value.map(
    (choice: any) => <li key={choice}><input value={choice}></input></li>
  );
    return (
        <div className="flex flex-col items-center justify-center">
        <label>{taskQuestions["config"]["choices"]["configPrompt"]}</label>
        <input
          type="text"
          placeholder="Add Choices Here"
          className="w-3/5 rounded-sm border border-rdsOrange"
        ></input>
        <ul>{choicesArray}</ul>
      </div>
    )
}