import React, { useContext, useState } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function ShuffleConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions =
    SurveyState["survey"]["questions"][SurveyState["question"]];
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
      console.log("Toggle on");
      return "bg-green-500 before:translate-x-5";
    } else {
      console.log("Toggle of");
      return "bg-rdsDarkAccent";
    }
  }

  return (
    <div className="flex flex-row gap-4">
      <label className="relative w-full">
        <span
          className={`absolute left-3/4 h-6 w-12 ${checkToggle()} rounded-full transition-all before:absolute before:top-[2px] before:left-1 before:h-5 before:w-5 before:rounded-full before:bg-white`}
          onClick={() => setToggle(!toggle)}
        ></span>
        {SurveyStateQuestions["config"]["shuffle"]["configPrompt"]}
        <input
          type="checkbox"
          onChange={(e) => handleCheckChange(e)} //Required needs to be added as a value in the survey!
          className="relative accent-rdsBlue opacity-0"
          defaultChecked={toggle}
        ></input>
      </label>
    </div>
  );
}
