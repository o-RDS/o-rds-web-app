import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function ShuffleConfig() {
    const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);

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
    
  return(
    <div>
        <label>{taskQuestions["config"]["shuffle"]["configPrompt"]}</label>
        <input
          type="checkbox"
          onChange={(e) => handleCheckChange(e)}
          defaultChecked={taskQuestions.config.shuffle.value}
        ></input>
      </div>
  )
}