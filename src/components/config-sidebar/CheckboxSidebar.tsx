import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function CheckboxSidebar(props: any) {
  const surveyState = useContext(SurveyContext);
  const taskQuestions = surveyState["survey"]["questions"][surveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);
  const choicesArray: any = taskQuestions.config.choices.value.map(
    (choice: any) => <li key={choice}>{choice}</li>
  );

  function handleTitleChange(e: any) {
    let test: any = surveyState;
    test["survey"]["questions"][test["question"]]["config"]["prompt"]["value"] =
      e.target.value;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: surveyState["question"],
    });
  }

  function handleChoiceChange(e: any) {
    let test: any = surveyState;
    test["questions"][props.index]["config"]["prompt"]["value"] =
      e.target.value;
    dispatch({
      type: "question-prompt",
      questions: test,
      question: surveyState["question"],
    });
  }

  function handleCheckChange(e: any) {
    let test: any = surveyState;
    test["survey"]["questions"][test["question"]]["config"]["shuffle"][
      "value"
    ] = e.target.checked;
    dispatch({
      type: "question-prompt",
      questions: test["survey"],
      question: test["question"],
    });
  }

  return (
    <>
      <div className="mt-3 flex flex-col items-center justify-center">
        <label>Page</label>
        <div className="flex flex-row gap-2">
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white">
            -
          </button>
          <p className="text-lg">{taskQuestions["page"]}</p>
          <button className="h-6 w-6 rounded-full bg-rdsOrange text-white">
            +
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center justify-center">
        <label>{taskQuestions["config"]["prompt"]["configPrompt"]}</label>
        <input
          type="text"
          placeholder="This is a question"
          className="w-3/5 rounded-sm border border-rdsOrange"
          onChange={(e: any) => handleTitleChange(e)}
        ></input>
      </div>
      <div>
        <label>{taskQuestions["config"]["shuffle"]["configPrompt"]}</label>
        <input
          type="checkbox"
          onChange={(e) => handleCheckChange(e)}
          defaultChecked={taskQuestions.config.shuffle.value}
        ></input>
      </div>
      <div className="flex flex-col items-center justify-center">
        <label>{taskQuestions["config"]["choices"]["configPrompt"]}</label>
        <input
          type="text"
          placeholder="Add Choices Here"
          className="w-3/5 rounded-sm border border-rdsOrange"
        ></input>
        <ul>{choicesArray}</ul>
      </div>
    </>
  );
}
