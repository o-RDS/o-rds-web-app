import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function RequiredConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);

  function handleCheckChange(e: any) {
    dispatch({
      type: "require",
      isChecked: e.target.checked,
    });
  }

  return (
    <div className="flex flex-row gap-4">
      <label>{"Require Question"}</label>
      <input
        type="checkbox"
        onChange={(e) => handleCheckChange(e)}
        defaultChecked={true} //Required needs to be added as a value in the survey!
        className="accent-rdsBlue"
      ></input>
    </div>
  );
}
