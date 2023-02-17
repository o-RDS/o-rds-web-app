import React, { useContext } from "react";
import giveConfigs from "../../../data/QuestionSwitcher";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function TypeConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);

  function handleTypeChange(e: any) {
    let test: any = SurveyState;
    let type = e.target.value.replace(" ", "");
    console.log(type);
    test["survey"]["questions"][test["question"]]["type"] = type;
    test["survey"]["questions"][test["question"]]["config"] = giveConfigs(type);
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: test["question"],
      change: true
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <label>Question Type</label>
      <select
        className="rounded-md border border-rdsBlue p-2 dark:bg-inherit dark:text-white"
        onChange={(e) => handleTypeChange(e)}
      >
        <option>Multiple Choice</option>
        <option>FillInBlank</option>
        <option>Short Answer</option>
        <option>Checkbox</option>
      </select>
    </div>
  );
}
