import React, { useContext } from "react";
import DeleteButton from "../DeleteButton";
import UpDownButton from "../UpDownButton";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function FillBlankConfig(props: any) {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][props.index];

  function isSelected() {
    if (SurveyState["question"] == props.index) {
      return "shadow-md dark:shadow-lg shadow-slate-900 border-rdsOrange";
    } else {
      return "border-rdsDark dark:border-rdsDarkAccent";
    }
  }

  function handleQuestionChange(index: number) {
    if (SurveyState["survey"]["questions"].hasOwnProperty(index)) {
      dispatch({
        type: "update",
        questions: SurveyState["survey"],
        question: index,
        change: SurveyState["change"],
      });
    }
  }

  function handleDeleteQuestion(question: number) {
    dispatch({
      type: "delete-question",
      questionToDelete: question,
    });
  }

  function handleDeleteQuestion2(question: string) {
    console.log(question);
    let test2 = SurveyState;
    let index = test2["survey"]["questionOrder"].indexOf(question);
    if (index != -1) {
      test2["survey"]["questionOrder"].splice(index, 1);
    }
    delete test2["survey"]["questions"][question];
    dispatch({
      type: "delete-question2",
      questions: SurveyState["survey"],
      question: SurveyState["survey"]["questionOrder"][0],
      change: true,
    });
  }

  function renderChoices() {
    return (
      <input
        type="text"
        disabled
        className="rounded border-2 border-rdsBlue bg-white text-center"
        placeholder="Text Would Go Here"
      ></input>
    );
  }
  return (
    <div
      className={`${isSelected()} rounded-md border-2 p-1 transition-all hover:border-rdsOrange`}
      onClick={(e) => handleQuestionChange(props.index)}
    >
      <div className="w-full p-2 dark:text-white">
        <div className="flex flex-row">
          <h2 className="text-lg font-semibold">
            {"Q" + (props.otherIndex + 1)}
          </h2>
          {SurveyState["survey"]["questions"][props.index]["require"] && (
            <p className="text-xl text-red-500">*</p>
          )}
          <div className="ml-auto">
            <UpDownButton
              otherIndex={props.otherIndex}
              direction="question-down"
            />
            <UpDownButton
              otherIndex={props.otherIndex}
              direction="question-up"
            />
            <DeleteButton
              handleDeleteQuestion={handleDeleteQuestion2}
              index={props.index}
            />
          </div>
        </div>
        <h3 className="text-md">
          {SurveyStateQuestions["config"]["prompt"]["value"]}
        </h3>
        <br></br>
        <div className="rounded-md bg-gray-100 p-3 dark:bg-rdsDarkAccent">
          <ul>{renderChoices()}</ul>
        </div>
      </div>
    </div>
  );
}
