import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function ShuffleConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);

  function handleCheckChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["questions"][test["question"]]["config"]["shuffle"][
      "value"
    ] = e.target.checked;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: test["question"],
      change: true
    });
  }

  return (
    <div className="flex flex-row gap-4">
      <label>{SurveyStateQuestions["config"]["shuffle"]["configPrompt"]}</label>
      <input
        type="checkbox"
        onChange={(e) => handleCheckChange(e)}
        defaultChecked={SurveyStateQuestions.config.shuffle.value}
        className="accent-rdsBlue"
      ></input>
    </div>
  );
}
