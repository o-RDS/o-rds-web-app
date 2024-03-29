import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function PageConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions =
    SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);

  function handlePageChange(page: number) {
    dispatch({
      type: "change-page",
      newPage: page,
    });
  }

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <label>Page</label>
      <div className="flex w-2/3 flex-row justify-between gap-2 rounded-full bg-rdsOrange">
        <button
          className="h-8 w-1/3 rounded-l-full border-r border-r-white bg-rdsOrange text-lg text-white hover:bg-rdsOrange/80"
          onClick={() => handlePageChange(SurveyStateQuestions["page"] - 1)}
        >
          -
        </button>
        <p className="h-8 text-lg text-white">
          {SurveyStateQuestions["page"] + 1}
        </p>
        <button
          className="h-8 w-1/3 rounded-r-full border-l border-l-white bg-rdsOrange  hover:bg-rdsOrange/80 text-lg text-white"
          onClick={() => handlePageChange(SurveyStateQuestions["page"] + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
