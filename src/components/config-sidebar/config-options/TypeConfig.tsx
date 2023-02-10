import React, {useContext} from "react";
import giveConfigs from "../../../data/QuestionSwitcher";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function TypeConfig() {
  const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);

  function handleTypeChange(e: any) {
    let test: any = task;
    let type = e.target.value.replace(" ", "");
    console.log(type);
    test["survey"]["questions"][test["question"]]["type"] = type;
    test["survey"]["questions"][test["question"]]["config"] = giveConfigs(type);
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: test["question"],
    });
  }
    
  return (
    <div>
      <select className="border border-rdsBlue" onChange={(e) => handleTypeChange(e)}>
        <option>Multiple Choice</option>
        <option>FillInBlank</option>
        <option>Short Answer</option>
        <option>Checkbox</option>
      </select>
    </div>
  )
}