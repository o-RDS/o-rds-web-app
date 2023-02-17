import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function PromptConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);

  function handleTitleChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["questions"][test["question"]]["config"]["prompt"]["value"] =
      e.target.value;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true
    });
  }

  return (
    <div
      id="question-prompt"
      className="mt-3 flex flex-col items-start justify-center gap-2"
    >
      <label htmlFor="question-prompt">
        {SurveyStateQuestions["config"]["prompt"]["configPrompt"]}
      </label>
      <textarea
        placeholder="This is a question"
        className="h-20 w-full rounded-md border border-rdsOrange p-1 dark:bg-inherit"
        onChange={(e: any) => handleTitleChange(e)}
        value={SurveyStateQuestions["config"]["prompt"]["value"]}
      ></textarea>
    </div>
  );
}
