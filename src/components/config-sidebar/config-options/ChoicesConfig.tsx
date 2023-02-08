import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function ChoicesConfig() {
    const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);

  function handleChoicesChange(index: number, e: any) {
    let test: any = task;
      test["survey"]["questions"][test["question"]]['config']["choices"]['value'][index] =
        e.target.value;
      dispatch({
        type: "question-prompt",
        questions: test["survey"],
        question: task["question"],
      });
  }
  const choicesArray: any = taskQuestions.config.choices.value.map(
    (choice: any, index: number) => <li key={choice}><input value={taskQuestions['config']['choices']['value'][index.toString()]} onChange={(e) => handleChoicesChange(index, e)}></input></li>
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