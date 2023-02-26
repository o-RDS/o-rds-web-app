import React, { useContext, useState } from "react";
import DeleteButton from "../DeleteButton";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function MCConfig(props: any) {
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

  function handleQuestionChange(index: string) {
    console.log(SurveyState["survey"]["questionOrder"].indexOf(index) != -1);
    if (SurveyState["survey"]["questionOrder"].indexOf(index) != -1) {
      dispatch({
        type: "update",
        questions: SurveyState["survey"],
        question: index,
        change: SurveyState["change"],
      });
    }
  }

  function handleQuestionUp() {
    console.log(SurveyState['survey']['questionOrder']);
    let test: any = SurveyState;
    if (props.otherIndex - 1 < 0) {
      return
    }
    let temp = test['survey']['questionOrder'][props.otherIndex - 1];
    test['survey']['questionOrder'][props.otherIndex - 1] = test['survey']['questionOrder'][props.otherIndex];
    test['survey']['questionOrder'][props.otherIndex] = temp;
    dispatch({
      type: "question-up",
      survey: test['survey'],
      question: test['question'],
      change: true
    });
  }

  function handleQuestionDown() {
    console.log(SurveyState['survey']['questionOrder']);
    let test: any = SurveyState;
    console.log(test['survey']['questionOrder']);
    if (props.otherIndex + 1 > test['survey']['questionOrder'].length()) {
      return
    }
    let temp = test['survey']['questionOrder'][props.otherIndex + 1];
    test['survey']['questionOrder'][props.otherIndex + 1] = test['survey']['questionOrder'][props.otherIndex];
    test['survey']['questionOrder'][props.otherIndex] = temp;
    console.log(test['survey']['questionOrder']);
    dispatch({
      type: "question-down",
      survey: test['survey'],
      question: test['question'],
      change: true
    });
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
          let index = test2["survey"]["questionOrder"].indexOf(
            question
          );
          if (index != -1) {
            test2["survey"]["questionOrder"].splice(index, 1);
          }
          delete test2["survey"]["questions"][question];
          dispatch({
            type: "delete-question2",
            questions: SurveyState["survey"],
            question: SurveyState['survey']['questionOrder'][0],
            change: true,
          });
  }

  function renderChoices() {
    return SurveyStateQuestions["config"]["choices"]["value"].map(
      (choice: any) => {
        return (
          <li key={choice}>
            <input type="radio" value={choice} disabled></input>
            <label className="ml-2">{choice}</label>
          </li>
        );
      }
    );
  }
  return (
    <>
      <div
        className={` ${isSelected()} rounded-md border-2 p-1 transition-all hover:border-2 hover:border-rdsOrange`} onClick={() => handleQuestionChange(props.index)}
      >
        <div className="w-full p-2 dark:text-white">
          <div className="flex flex-row">
            <h2 className="font-semibold text-lg">{"Q" + (props.otherIndex + 1)}</h2>
            {SurveyState['survey']['questions'][props.index]['require'] && <p className="text-red-500 text-xl">*</p>}
            <div className="ml-auto">
            <button onClick={() => handleQuestionDown()} className="hover:bg-rdsDarkAccent p-1 rounded-md mx-1">▼</button>
            <button onClick={() => handleQuestionUp()} className="hover:bg-rdsDarkAccent p-1 rounded-md mx-1">▲</button>
            <DeleteButton
              handleDeleteQuestion={handleDeleteQuestion2}
              index={props.index}
            />
            </div>
          </div>
          <h3>{SurveyStateQuestions["config"]["prompt"]["value"]}</h3>
          <br></br>
          <div className="rounded-md bg-gray-100 p-3 dark:bg-rdsDarkAccent">
            <ul>{renderChoices()}</ul>
          </div>
        </div>
      </div>
    </>
  );
}
