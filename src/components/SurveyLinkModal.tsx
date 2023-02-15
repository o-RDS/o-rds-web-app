import React, { useContext, useState } from "react";
import { TasksDispatchContext } from "../context/SurveyBuilderContext";

const SurveyLinkModal = (props: any) => {
  const [copyLabel, setCopyLabel] = useState("Copy");
  const dispatch = useContext(TasksDispatchContext);

  function handlePauseSurvey() {
    dispatch({
      type: "question-prompt",
      questions: "",
      question: "",
    });
  }
  if (!props.display) {
    return <></>;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `${window.location.origin}/survey/${props.surveyID}`
    );
    setCopyLabel("Copied");
    setTimeout(() => {
      setCopyLabel("Copy");
    }, 2000);
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex h-3/5 w-3/5 flex-col justify-end gap-4 rounded-md border-2 border-rdsBlue bg-white p-4">
        <h3 className="self-start justify-self-start text-lg font-bold">
          Survey Availability
        </h3>
        <div className="">
          <h3 className="text-lg font-bold">Share Survey Link</h3>
          <p>
            Use the button below to copy the link to distribute your survey.
          </p>
          <div className="flex flex-row justify-center gap-5">
            <div className="rounded-md border-2 border-rdsOrange pl-2 pr-2">
              {window.location.origin}/survey/{props.surveyID}
            </div>
            <button
              className="rounded-md border-2 border-rdsBlue pl-2 pr-2"
              onClick={() => copyToClipboard()}
            >
              {copyLabel}
            </button>
          </div>
        </div>
        <div className="w-full self-start">
          <div className="flex w-full flex-row justify-between gap-2">
            <button
              onClick={() => props.showModal(false)}
              className="w-3/12 rounded-sm bg-rdsOrange pl-2 pr-2 text-white"
            >
              Close
            </button>
            <div className="flex flex-row gap-2">
              <button className="rounded-md border-2 border-rdsBlue p-1">
                Pause Survey
              </button>
              <button className="rounded-md bg-rdsBlue py-1 pl-2 pr-2 text-white">
                Publish Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyLinkModal;
