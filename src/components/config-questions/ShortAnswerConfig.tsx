import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function ShortAnswerConfig(props: any) {
  const surveyState = useContext(SurveyContext);
  const taskQuestions = surveyState["survey"]["questions"][props.index];
  const dispatch = useContext(SurveyDispatchContext);

  function handleQuestionChange(index: number) {
    dispatch({
      type: "update",
      questions: surveyState["survey"],
      question: index,
    });
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
      className="rounded-sm border-2 border-white p-1 transition-all hover:border-2 hover:border-red-500 focus:border-red-500"
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full">
        <h3>{"Q" + (props.index + 1)}</h3>
        <div className="rounded-md bg-gray-100 p-3">
          <h2>{taskQuestions["config"]["prompt"]["value"]}</h2>
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
