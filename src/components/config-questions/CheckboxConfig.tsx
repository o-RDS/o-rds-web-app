import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function CheckboxConfig(props: any) {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const taskQuestions = task["survey"]["questions"][props.index];

  function isSelected() {
    if (task["question"] == props.index) {
      return "shadow-lg shadow-slate-900";
    } else {
      return "";
    }
  }

  function handleQuestionChange(index: number) {
    if (task['survey']['questions'].hasOwnProperty(index)) {
      dispatch({
        type: "update",
        questions: task["survey"],
        question: index,
        change: task['change']
      });
      }
  }

  function handleDeleteQuestion(question: number) {
    console.log(question);
    let test = task;
    let test2 = task;
    test2['survey']['questions'] = test['survey']['questions'].filter((thing:any, index: any) => index != question);
    console.log(test2);
    dispatch({
      type: "question-prompt",
      questions: test2['survey'],
      question: 0,
      change: true
    })
  }

  function renderChoices() {
    return taskQuestions["config"]["choices"]["value"].map((choice: any) => {
      return (
        <li key={choice} className="">
          <input type="checkbox" value={choice} disabled></input>
          <label className="ml-2">{choice}</label>
        </li>
      );
    });
  }
  return (
    <div
      className={`dark:border-rdsDarkAccent2 ${isSelected()} rounded-md border-2 border-white p-1 transition-all hover:border-2 hover:border-rdsOrange focus:border-red-500`}
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full dark:bg-rdsDarkAccent2 dark:text-white">
      <div className="flex flex-row">
        <h3>{"Q" + (props.index + 1)}</h3>
        <button className="rounded-sm p-1 bg-rdsDarkAccent z-50 pointer-events-auto ml-auto" onClick={() => handleDeleteQuestion(props.index)}>Delete</button>
        </div>
        <div className="rounded-md bg-gray-100 p-3 dark:bg-rdsDarkAccent2">
          <h2>{taskQuestions["config"]["prompt"]["value"]}</h2>
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
