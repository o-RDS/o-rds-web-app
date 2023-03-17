import { useState } from "react";
import ShareBox from "../../components/ShareBox";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function Share() {
  const [copyLabel, setCopyLabel] = useState("Copy");

  function getLink() {
    let link = window.location.href;
    link = link.replace(
      "/share",
      "?r=" +
        window.sessionStorage.getItem("hash") +
        "&p=" +
        window.sessionStorage.getItem("responseID") +
        "&d=" +
        window.sessionStorage.getItem("depth")
    );
    return link;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(getLink());
    setCopyLabel("Copied");
    setTimeout(() => {
      setCopyLabel("Copy");
    }, 2000);
  }

  function openShare() {
    navigator.share({
      title: "Share Survey",
      text: "Share this survey with others",
      url: getLink(),
    });
  }

  return (
    <SurveyTakerStandardPage>
      <div className="flex flex-col items-center">
        <p className="max-w-prose">
          Thank you for taking the time to complete this survey.
          <br/>
          <br/>
          If you would like to share this survey with others for additional
          rewards, please use the link below.
        </p>
      </div>

      <div className="flex flex-col items-center w-4/5 lg:w-1/3 mt-4 gap-y-6">
        <ShareBox link={getLink()} />
        <div className="flex flex-row w-full gap-8 justify-center">
          <button
            className="w-1/3 rounded bg-rdsOrange p-1 text-white"
            onClick={() => {
              copyToClipboard();
            }}
          >
            {copyLabel}
          </button>
          <button
            className="w-1/3 rounded bg-rdsOrange p-1 text-white"
            onClick={() => openShare()}
          >
            Share
          </button>
        </div>
      </div>
    </SurveyTakerStandardPage>
  );
}
