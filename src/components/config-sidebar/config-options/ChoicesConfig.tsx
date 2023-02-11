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

  function addChoice(action: string) {
    let test: any = task;
    switch(action) {
      case "pop": {
        test["survey"]["questions"][test["question"]]['config']["choices"]['value'].pop();
        dispatch({
          type: "question-prompt",
          questions: test["survey"],
          question: task["question"],
        });
        break;
      }
      case "push": {
        test["survey"]["questions"][test["question"]]['config']["choices"]['value'].push("New Option");
        dispatch({
          type: "question-prompt",
          questions: test["survey"],
          question: task["question"],
        });
        break;
      }
    }
  }
  const choicesArray: any = taskQuestions.config.choices.value.map(
    (choice: any, index: number) => <li key={index}><input value={choice} onChange={(e) => handleChoicesChange(index, e)} className="border-b-2 focus:border-b-rdsBlue border-gray-200 focus:outline-none transition-all dark:bg-rdsDarkAccent2" placeholder="Enter Choice Here"></input><br></br></li>
  );
    return (
        <div className="flex flex-col items-center justify-center">
        <label>{taskQuestions["config"]["choices"]["configPrompt"]}</label>
        <div className="flex flex-row gap-2">
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white" onClick={() => addChoice("pop")}>
            -
          </button>
          <p className="text-lg">{taskQuestions["config"]['choices']['value'].length}</p>
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white" onClick={() => addChoice("push")}>
            +
          </button>
        </div>
        <ul className="flex flex-col gap-2">{choicesArray}</ul>
      </div>
    )
}