import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function PromptConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions =
    SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);

  function handleTitleChange(e: any) {
    dispatch({
      type: "question-prompt",
      prompt: e.target.value,
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
        className="h-32 w-full rounded-md border border-rdsOrange p-2 dark:bg-inherit"
        onChange={(e: any) => handleTitleChange(e)}
        value={SurveyStateQuestions["config"]["prompt"]["value"]}
      ></textarea>
    </div>
  );
}
