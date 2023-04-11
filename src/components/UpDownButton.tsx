import React, { useContext, useState } from "react";
import DeleteButton from "./DeleteButton";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "./../context/SurveyBuilderContext";

export default function UpDownButton(props: any) {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
  const SurveyStateQuestions = SurveyState["survey"]["questions"][props.index];

  function handleQuestionUp() {
    console.log(SurveyState["survey"]["questionOrder"]);
    let test: any = SurveyState;
    if (props.otherIndex - 1 < 0) {
      return;
    }
    let temp = test["survey"]["questionOrder"][props.otherIndex - 1];
    test["survey"]["questionOrder"][props.otherIndex - 1] =
      test["survey"]["questionOrder"][props.otherIndex];
    test["survey"]["questionOrder"][props.otherIndex] = temp;
    dispatch({
      type: "question-up",
      survey: test["survey"],
      question: test["question"],
      change: true,
    });
  }

  function handleQuestionDown() {
    console.log(SurveyState["survey"]["questionOrder"]);
    let test: any = SurveyState;
    if (props.otherIndex + 1 > test["survey"]["questionOrder"].length) {
      dispatch({
        type: "question-down",
        survey: test["survey"],
        question: test["question"],
        change: true,
      });
    } else {
      let temp = test["survey"]["questionOrder"][props.otherIndex + 1];
      test["survey"]["questionOrder"][props.otherIndex + 1] =
        test["survey"]["questionOrder"][props.otherIndex];
      test["survey"]["questionOrder"][props.otherIndex] = temp;
      dispatch({
        type: "question-down",
        survey: test["survey"],
        question: test["question"],
        change: true,
      });
    }
  }

  function handleQuestionMove() {
    let test: any = SurveyState;
    if (props.direction === "question-up") {
      let temp = test["survey"]["questionOrder"][props.otherIndex - 1];
      test["survey"]["questionOrder"][props.otherIndex - 1] =
        test["survey"]["questionOrder"][props.otherIndex];
      test["survey"]["questionOrder"][props.otherIndex] = temp;
      dispatch({
        type: "question-up",
        survey: test["survey"],
        question: test["question"],
        change: true,
      });
    } else {
      let temp = test["survey"]["questionOrder"][props.otherIndex + 1];
      test["survey"]["questionOrder"][props.otherIndex + 1] =
        test["survey"]["questionOrder"][props.otherIndex];
      test["survey"]["questionOrder"][props.otherIndex] = temp;
      dispatch({
        type: "question-down",
        survey: test["survey"],
        question: test["question"],
        change: true,
      });
    }
  }

  function isUpDisabled() {
    if (props.otherIndex == 0) {
      return true;
    } else {
      return false;
    }
  }

  function isDownDisabled() {
    if (props.otherIndex + 1 == SurveyState["survey"]["questionOrder"].length) {
      return true;
    } else {
      return false;
    }
  }

  function isUpDownDisabled() {
    if (
      props.otherIndex == 0 ||
      props.otherIndex + 1 == SurveyState["survey"]["questionOrder"].length
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <button
        onClick={() => handleQuestionMove()}
        className={`mx-1 rounded-md p-1 transition-all hover:dark:bg-rdsDarkAccent disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-200`}
        disabled={
          props.direction === "question-up" ? isUpDisabled() : isDownDisabled()
        }
      >
        {props.direction === "question-up" ? "▲" : "▼"}
      </button>
    </>
  );
}
