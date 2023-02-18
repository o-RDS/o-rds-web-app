import React, { useContext } from "react";
import DeleteButton from "../DeleteButton";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function CheckboxConfig(props: any) {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][props.index];

  function isSelected() {
    if (SurveyState["question"] == props.index) {
      return "shadow-md dark:shadow-lg shadow-slate-900 border-rdsOrange";
    } else {
      return "border-rdsDark dark:border-rdsDarkAccent";
    }
  }

  function handleQuestionChange(index: number) {
    if (SurveyState['survey']['questions'].hasOwnProperty(index)) {
      dispatch({
        type: "update",
        questions: SurveyState["survey"],
        question: index,
        change: SurveyState['change']
      });
      }
  }

  function handleDeleteQuestion(question: number) {
    console.log(question);
    let test = SurveyState;
    let test2 = SurveyState;
    let index = test2['survey']['questionOrder'].indexOf(question);
    test2['survey']['questionOrder'].splice(index, 1);
    delete test2['survey']['questions'][question];
    console.log(test2);
    dispatch({
      type: "question-prompt",
      questions: test2['survey'],
      question: test2['survey']['questionOrder'][0],
      change: true
    })
  }

  function renderChoices() {
    return SurveyStateQuestions["config"]["choices"]["value"].map((choice: any) => {
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
      className={`${isSelected()} rounded-md border-2 p-1 transition-all hover:border-rdsOrange`}
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full dark:text-white p-2">
      <div className="flex flex-row">
        <h3>{"Q" + (props.otherIndex + 1)}</h3>
        <DeleteButton handleDeleteQuestion={handleDeleteQuestion} index={props.index}/>
        </div>
        <br></br>
        <div className="rounded-md bg-gray-100 p-3 dark:bg-rdsDarkAccent">
          <h2>{SurveyStateQuestions["config"]["prompt"]["value"]}</h2>
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
