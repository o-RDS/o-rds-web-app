import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function FillBlankConfig(props: any) {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][props.index];

  function isSelected() {
    if (SurveyState["question"] == props.index) {
      return "shadow-lg shadow-slate-900";
    } else {
      return "";
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
    return (
      <input
        type="text"
        disabled
        className="rounded border-2 border-rdsBlue bg-white text-center"
        placeholder="Text Would Go Here"
      ></input>
    );
  }
  return (
    <div
      className={`dark:border-rdsDarkAccent2 ${isSelected()} rounded-md border-2 border-white p-1 transition-all hover:border-2 hover:border-rdsOrange focus:border-red-500`}
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full text-white dark:bg-rdsDarkAccent2">
      <div className="flex flex-row">
        <h3>{"Q" + (props.index + 1)}</h3>
        <button className="rounded-sm p-1 bg-rdsDarkAccent z-50 pointer-events-auto ml-auto" onClick={() => handleDeleteQuestion(props.index)}>Delete</button>
        </div>
        <div className="rounded-md bg-gray-100 p-3 dark:bg-rdsDarkAccent2">
          <h2>{SurveyStateQuestions["config"]["prompt"]["value"]}</h2>
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
