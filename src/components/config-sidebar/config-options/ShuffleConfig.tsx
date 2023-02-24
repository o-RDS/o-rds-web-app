import React, { useContext, useState } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function ShuffleConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);
  const [toggle, setToggle] = useState(false);

  function handleCheckChange(e: any) {
    dispatch({
      type: "shuffle",
      isChecked: e.target.checked,
    });
  }

  function checkToggle() {
    if (toggle) {
      console.log("Toggle on")
      return "bg-green-500 before:translate-x-5"
    } else {
      console.log("Toggle of")
      return "bg-rdsDarkAccent"
    }
  }

  return (
    <div className="flex flex-row gap-4">
      <label className="w-full relative">
      <span className={`left-3/4 absolute w-12 h-6 ${checkToggle()} rounded-full before:bg-white before:rounded-full before:w-5 before:h-5 before:absolute before:top-[2px] before:left-1 transition-all`} onClick={() => setToggle(!toggle)}></span>
      {SurveyStateQuestions["config"]["shuffle"]["configPrompt"]}
      <input
        type="checkbox"
        onChange={(e) => handleCheckChange(e)} //Required needs to be added as a value in the survey!
        className="accent-rdsBlue relative opacity-0"
        defaultChecked={toggle}
      ></input>
      </label>
    </div>
  );
}
