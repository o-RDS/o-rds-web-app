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
    dispatch({
      type: "shuffle",
      isChecked: e.target.checked,
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
