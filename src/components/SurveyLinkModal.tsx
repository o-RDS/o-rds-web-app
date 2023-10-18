import React, { useContext, useState } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../context/SurveyBuilderContext";
import SurveyitemComplete from "./SurveyItemComplete";

const SurveyLinkModal = (props: any) => {
  const [copyLabel, setCopyLabel] = useState("Copy");
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);

  function handleSurveyStatus(status: boolean) {
    let test = SurveyState;
    test["survey"]["live"] = status;
    dispatch({
      type: "update-survey-status",
      status: status,
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

  function checkIfReadyToPublish() {
    console.log(SurveyState["survey"]["questionOrder"].length);
    if (
      SurveyState["survey"]["questionOrder"].length == 0 ||
      SurveyState["survey"]["title"] == ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  function renderStatus() {
    if (SurveyState["change"] == true) {
      return {
        colors: "border-yellow-500 text-yellow-500 bg-yellow-500 bg-opacity-10",
        active: "Pending Changes",
      };
    } else if (SurveyState["survey"]["live"] == true) {
      return {
        colors: "border-green-500 text-green-600 bg-green-500 bg-opacity-10",
        active: "Active",
      };
    } else {
      return {
        colors: "border-red-500 text-red-500 bg-red-500 bg-opacity-10",
        active: "Inactive",
      };
    }
  }

  function checkIfItemDone(item: string) {
    switch (item) {
      case "title": {
        return (
          <SurveyitemComplete
            done={SurveyState["survey"][item] !== ""}
            item="Survey Name"
          />
        );
      }
      case "questionOrder": {
        return (
          <SurveyitemComplete
            done={SurveyState["survey"]["questionOrder"].length >= 1}
            item="At Least One Question"
          />
        );
      }
      case "researcherMessage": {
        return (
          <SurveyitemComplete
            done={SurveyState["survey"][item] !== ""}
            item="Researcher Message"
          />
        );
      }
      case "endMessage": {
        return (
          <SurveyitemComplete
            done={SurveyState["survey"][item] !== ""}
            item="End of Survey Message"
          />
        );
      }
      case "phone": {
        return (
          <SurveyitemComplete
            done={SurveyState["survey"]["contactInfo"][item] !== ""}
            item="Phone Number"
          />
        );
      }
      case "email": {
        return (
          <SurveyitemComplete
            done={SurveyState["survey"]["contactInfo"][item] !== ""}
            item="Email"
          />
        );
      }
      case "mail": {
        return (
          <SurveyitemComplete
            done={SurveyState["survey"]["contactInfo"][item] !== ""}
            item="Mailing Address"
          />
        );
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex w-full items-center justify-center backdrop-blur-sm">
      <div
        className="flex h-auto w-3/5 flex-col justify-between gap-4 rounded-md border-2 border-rdsBlue bg-white p-4 dark:bg-rdsDark2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row">
          <h3 className="self-start justify-self-start text-xl font-bold">
            Survey Availability
          </h3>
          <div
            className={`ml-auto rounded-sm border ${
              renderStatus().colors
            } pl-2 pr-2 transition-all`}
          >
            {renderStatus().active}
          </div>
        </div>
        <h3 className="text-lg">Survey Checklist</h3>
        <div className="flex flex-row justify-around">
          <div className="">
            <h4>Required</h4>
            <div className="h-1 w-full rounded-lg bg-rdsDarkAccent2"></div>
            <ul className="">
              <li>{checkIfItemDone("title")}</li>
              <li>{checkIfItemDone("questionOrder")}</li>
            </ul>
          </div>
          <div>
            <h4>Optional</h4>
            <div className="h-1 w-full rounded-lg bg-rdsDarkAccent2"></div>
            <ul>
              <li>{checkIfItemDone("researcherMessage")}</li>
              <li>{checkIfItemDone("endMessage")}</li>
              <li>{checkIfItemDone("phone")}</li>
              <li>{checkIfItemDone("email")}</li>
              <li>{checkIfItemDone("mail")}</li>
            </ul>
          </div>
        </div>
        <div className="">
          <h3 className="text-lg font-bold">Share Survey Link</h3>
          <p>
            Use the button below to copy the link to distribute your survey.
          </p>
          <br></br>
          <div className="flex flex-row justify-center gap-5">
            <div className="rounded-md border-2 border-rdsOrange p-2">
              {window.location.origin}/survey/{props.surveyID}
            </div>
            <button
              className="rounded-md border-2 border-rdsBlue hover:bg-rdsBlue hover:bg-opacity-10 pl-2 pr-2"
              onClick={() => copyToClipboard()}
            >
              {copyLabel}
            </button>
          </div>
          <br></br>
        </div>
        <div className="w-full self-start">
          <div className="flex w-full flex-row justify-between gap-2">
            <button
              onClick={() => props.showModal(false)}
              className="w-3/12 rounded-sm bg-rdsOrange pl-2 pr-2 text-white transition-all hover:bg-rdsOrange/80 hover:border-rdsOrange/80 active:translate-y-1 active:shadow-none"
            >
              Close
            </button>
            <div className="flex flex-row gap-2">
              <button
                className="rounded-md border-2 border-rdsBlue p-1 text-black transition-all hover:bg-rdsBlue hover:bg-opacity-10 active:translate-y-1 active:shadow-none dark:text-white"
                onClick={() => handleSurveyStatus(false)}
              >
                Pause Survey
              </button>
              <button
                className="rounded-md bg-rdsBlue py-1 pl-2 pr-2 text-white transition-all hover:shadow-md hover:bg-rdsBlue/80 hover:border-rdsBlue/80 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-500"
                disabled={checkIfReadyToPublish()}
                onClick={() => handleSurveyStatus(true)}
              >
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
