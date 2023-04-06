import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../../context/SurveyBuilderContext";

export default function ChoicesConfig() {
  const SurveyState = useContext(SurveyContext);
  const SurveyStateQuestions =
    SurveyState["survey"]["questions"][SurveyState["question"]];
  const dispatch = useContext(SurveyDispatchContext);

  function handleChoicesChange(index: number, e: any) {
    dispatch({
      type: "choices-change",
      choiceIndex: index,
      newChoice: e.target.value,
    });
  }

  function addChoice(action: string) {
    let test: any = SurveyState;
    switch (action) {
      case "pop": {
        test["survey"]["questions"][test["question"]]["config"]["choices"][
          "value"
        ].pop();
        dispatch({
          type: "newer-choice",
          questions: test["survey"],
          question: SurveyState["question"],
          change: true,
        });
        break;
      }
      case "push": {
        test["survey"]["questions"][test["question"]]["config"]["choices"][
          "value"
        ].push("New Option");
        dispatch({
          type: "newer-choice",
          questions: test["survey"],
          question: SurveyState["question"],
          change: true,
        });
        break;
      }
    }
  }
  const choicesArray: any = SurveyStateQuestions.config.choices.value.map(
    (choice: any, index: number) => (
      <li key={index}>
        <input
          value={choice}
          onChange={(e) => handleChoicesChange(index, e)}
          className="w-full rounded-sm border-b-2 border-gray-200 p-1 transition-all focus:border-b-rdsBlue focus:outline-none dark:bg-rdsDarkAccent2"
          placeholder="Enter Choice Here"
        ></input>
        <br></br>
      </li>
    )
  );
  return (
    <div className="flex flex-col items-start justify-center gap-5">
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <label>
          {SurveyStateQuestions["config"]["choices"]["configPrompt"]}
        </label>
        <div className="flex w-2/3 flex-row justify-between gap-2 rounded-full bg-rdsOrange">
          <button
            className="h-8 w-1/3 rounded-l-full border-r border-r-white bg-rdsOrange text-lg text-white"
            onClick={() => addChoice("pop")}
          >
            -
          </button>
          <p className="text-lg text-white">
            {SurveyStateQuestions["config"]["choices"]["value"].length}
          </p>
          <button
            className="h-8 w-1/3 rounded-r-full border-l border-l-white bg-rdsOrange text-lg text-white"
            onClick={() => addChoice("push")}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4>{SurveyStateQuestions["config"]["choices"]["editablePrompt"]}</h4>
        <ul className="flex flex-col gap-2">{choicesArray}</ul>
      </div>
    </div>
  );
}
