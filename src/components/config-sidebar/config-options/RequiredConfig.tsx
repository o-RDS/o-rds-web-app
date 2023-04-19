import React, { useContext, useState } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function RequiredConfig() {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
  console.log(
    SurveyState["survey"]["questions"][SurveyState["question"]]["require"]
  );
  const [toggle, setToggle] = useState(
    SurveyState["survey"]["questions"][SurveyState["question"]]["require"]
  );

  function handleCheckChange(e: any) {
    dispatch({
      type: "require",
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
          className={`absolute left-3/4 h-6 w-12 ${checkToggle()} rounded-full before:absolute before:top-[2px] before:left-1 before:h-5 before:w-5 before:rounded-full before:bg-white before:transition-all`}
          onClick={() => setToggle(!toggle)}
        ></span>
        {"Require Question"}
        <input
          type="checkbox"
          onChange={(e) => handleCheckChange(e)} //Required needs to be added as a value in the survey!
          className="relative accent-rdsBlue opacity-0"
          defaultChecked={
            SurveyState["survey"]["questions"][SurveyState["question"]][
              "require"
            ]
          }
        ></input>
      </label>
    </div>
  );
}
