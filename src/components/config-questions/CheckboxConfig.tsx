import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../context/SurveyBuilderContext";

export default function CheckboxConfig(props: any) {
  const task = useContext(TasksContext);
  console.log(task['survey']['questions']);
  const dispatch = useContext(TasksDispatchContext);
  const chooseQuestion = (newQuestion: any, target: any, index: number) => {
    props.updateQuestion(newQuestion, index);
    target.tabIndex = -1;
    target.focus();
  };

  function handleQuestionChange(index: number) {
    dispatch({
      type: 'update',
      questions: task['survey'],
      question: index
    })
  }

  function renderChoices() {
    return props.config.config.choices.value.map((choice: any) => {
      return (
        <li key={choice}>
          <input type="checkbox" value={choice} disabled></input>
          <label className="ml-2">{choice}</label>
        </li>
      );
    });
  }
  return (
    <div
      className="rounded border-2 border-white p-1 transition-all hover:border-2 hover:border-rdsOrange focus:border-red-500"
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full">
        <h3>{"Q" + (props.index + 1)}</h3>
        <div className="rounded-md bg-gray-100 p-3">
          <h2>{props.config.config.prompt.value}</h2>
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
