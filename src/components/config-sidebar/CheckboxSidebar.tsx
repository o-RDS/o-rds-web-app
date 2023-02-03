import React, { useContext } from "react";
import { TasksContext, TasksDispatchContext } from "../../context/SurveyBuilderContext";


export default function CheckboxSidebar(props: any) {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const choicesArray: any = props.config.config.choices.value.map(
    (choice: any) => <li key={choice}>{choice}</li>
  );

  function handleTitleChange(e: any) {
    let test: any = task;
    console.log(test['question']);
    console.log(test['survey']['questions'][test['question']]['config']['prompt']['value']);
    console.log(e.target.value);
    test['survey']['questions'][test['question']]['config']['prompt']['value'] = e.target.value;
    console.log(test);
    dispatch({
      type: 'question-prompt',
      questions: test['survey'],
      question: task['question']
    })
  }

  function handleChoiceChange(e: any) {
    let test: any = task;
    test['questions'][props.index]['config']['prompt']['value'] = e.target.value;
    dispatch({
      type: 'question-prompt',
      questions: test,
      question: task['question']
    })
  }

  function handleCheckChange(e: any) {
    let test: any = task;
    console.log(test['question'])
    test['questions'][test['question']]['config']['shuffle']['value'] = e.target.checked;
    dispatch({
      type: 'question-prompt',
      questions: test,
      question: test['question']
    })
  }

  const dealWithChangeText = (e: any) => {
    let test: any = props.config;
    test["config"]["prompt"]["value"] = e.target.value;
    props.updateQuestion(test);
  };

  const dealWithChangeOther = (e: any) => {
    let test: any = props.config;
    test["config"]["shuffle"]["value"] = e.target.checked;
    console.log(test["config"]["shuffle"]["value"]);
    props.updateQuestion(test);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-3">
        <label>Page</label>
        <div className="flex flex-row gap-2">
          <button className="rounded-full bg-rdsOrange text-white w-6 h-6">-</button>
          <p className="text-lg">{props.config.page}</p>
          <button className="rounded-full bg-rdsOrange text-white w-6 h-6">+</button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-3">
        <label>{props.config.config.prompt.configPrompt}</label>
        <input
          type="text"
          placeholder="This is a question"
          className="w-3/5 rounded-sm border border-rdsOrange"
          onChange={(e: any) => handleTitleChange(e)}
        ></input>
      </div>
      <div>
        <label>{props.config.config.shuffle.configPrompt}</label>
        <input type="checkbox" onChange={(e) => dealWithChangeOther(e)} defaultChecked={props.config.config.shuffle.value}></input>
      </div>
      <div className="flex flex-col items-center justify-center">
        <label>{props.config.config.choices.configPrompt}</label>
        <input
          type="text"
          placeholder="Add Choices Here"
          className="w-3/5 rounded-sm border border-rdsOrange"
        ></input>
        <ul>{choicesArray}</ul>
      </div>
    </>
  );
}
