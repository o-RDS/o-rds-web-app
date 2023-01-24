import { useState } from "react";
import ShareBox from "../../components/ShareBox";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function Share() {
  const [copyLabel, setCopyLabel] = useState("Copy");

  function getLink() {
    let link = window.location.href;
    link = link.replace(
      "/share",
      "?p=" +
        window.sessionStorage.getItem("hash") +
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
      <p className="max-w-prose">
        Thank you for taking the time to complete this survey.
      </p>
      <p className="max-w-prose">
        If you would like to share this survey with others for additional
        rewards, please use the link below.
      </p>
      <ShareBox link={getLink()} />
      <div className="flex flex-row w-1/3 gap-8">
        <button
          className="p-1 grow rounded bg-rdsOrange text-white"
          onClick={() => {
            copyToClipboard();
          }}
        >
          {copyLabel}
        </button>
        <button
          className="p-1 grow rounded bg-rdsOrange text-white"
          onClick={() => openShare()}
        >
          Share
        </button>
      </div>
    </SurveyTakerStandardPage>
  );
}
