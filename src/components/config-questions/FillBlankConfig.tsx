import React, { useContext } from "react";
import DeleteButton from "../DeleteButton";
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
      return "shadow-md dark:shadow-lg shadow-slate-900 border-rdsOrange";
    } else {
      return "border-rdsDark dark:border-rdsDarkAccent";
    }
  }

  function handleQuestionUp() {
    console.log(SurveyState['survey']['questionOrder']);
    let test: any = SurveyState;
    console.log(test['survey']['questionOrder']);
    let temp = test['survey']['questionOrder'][props.otherIndex - 1];
    test['survey']['questionOrder'][props.otherIndex - 1] = test['survey']['questionOrder'][props.otherIndex];
    test['survey']['questionOrder'][props.otherIndex] = temp;
    console.log(test['survey']['questionOrder']);
    dispatch({
      type: "question-down",
      survey: test['survey'],
      question: test['question'],
      change: true
    });
  }

  function handleQuestionDown() {
    let test: any = SurveyState;
    let temp = test['survey']['questionOrder'][props.otherIndex + 1];
    test['survey']['questionOrder'][props.otherIndex + 1] = test['survey']['questionOrder'][props.otherIndex];
    test['survey']['questionOrder'][props.otherIndex] = temp;
    dispatch({
      type: "question-down",
      survey: test['survey'],
      question: test['question'],
      change: true
    });
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
    dispatch({
      type: "delete-question",
      questionToDelete: question
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
      className={`${isSelected()} rounded-md border-2 p-1 transition-all hover:border-rdsOrange`}
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full dark:text-white p-2">
      <div className="flex flex-row">
        <h2 className="font-semibold text-lg">{"Q" + (props.otherIndex + 1)}</h2>
        <div className="ml-auto">
            <button onClick={() => handleQuestionDown()} className="hover:bg-rdsDarkAccent p-1 rounded-md mx-1">▼</button>
            <button onClick={() => handleQuestionUp()} className="hover:bg-rdsDarkAccent p-1 rounded-md mx-1">▲</button>
            <DeleteButton
              handleDeleteQuestion={handleDeleteQuestion}
              index={props.index}
            />
            </div>
        </div>
        <h3 className="text-md">{SurveyStateQuestions["config"]["prompt"]["value"]}</h3>
        <br></br>
        <div className="rounded-md bg-gray-100 p-3 dark:bg-rdsDarkAccent">
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
