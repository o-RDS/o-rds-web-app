import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function ShortAnswerConfig(props: any) {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][props.index];
  const dispatch = useContext(SurveyDispatchContext);

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
    return (
      <textarea
        disabled
        className="rounded border-2 border-rdsBlue bg-white text-center"
        placeholder="Text Would Go Here"
      ></textarea>
    );
  }
  return (
    <div
      className={`dark:border-rdsDarkAccent2 ${isSelected()} rounded-md border-2 border-white p-1 transition-all hover:border-2 hover:border-rdsOrange focus:border-red-500`}
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full">
      <div className="flex flex-row">
        <h3>{"Q" + (props.index + 1)}</h3>
        <button className="rounded-sm p-1 bg-rdsDarkAccent z-50 pointer-events-auto ml-auto" onClick={() => handleDeleteQuestion(props.index)}>Delete</button>
        </div>
        <div className="rounded-md bg-gray-100 p-3">
          <h2>{SurveyStateQuestions["config"]["prompt"]["value"]}</h2>
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
