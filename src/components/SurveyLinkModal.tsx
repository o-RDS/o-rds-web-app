import React, { useState } from "react";

const SurveyLinkModal = (props: any) => {
  const [copyLabel, setCopyLabel] = useState("Copy");
  if (!props.display) {
    return <></>;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `http://localhost:3000/survey/${props.surveyID}`
    );
    setCopyLabel("Copied");
    setTimeout(() => {
      setCopyLabel("Copy");
    }, 2000);
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex w-2/5 flex-col gap-3 rounded-md border-2 border-rdsBlue bg-white p-4">
        <h1>Share Survey Link</h1>
        <p>Use the button below to copy the link to distribute your survey.</p>
        <div className="flex flex-row justify-center gap-5">
          <div className="rounded-md border-2 border-rdsOrange pl-2 pr-2">
            http://localhost:3000/survey/{props.surveyID}
          </div>
          <button
            className="rounded-md border-2 border-rdsBlue pl-2 pr-2"
            onClick={() => copyToClipboard()}
          >
            {copyLabel}
          </button>
        </div>
        <button
          onClick={() => props.showModal(false)}
          className="rounded-sm bg-rdsOrange pl-2 pr-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SurveyLinkModal;
