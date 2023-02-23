import React, { useContext, useState } from "react";
import { SurveyContext, SurveyDispatchContext } from "../context/SurveyBuilderContext";
import SurveyitemComplete from "./SurveyItemComplete";

const SurveyLinkModal = (props: any) => {
  const [copyLabel, setCopyLabel] = useState("Copy");
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);

  function handleSurveyStatus(status: boolean) {
    let test = SurveyState;
    test['survey']['live'] = status;
    dispatch({
      type: "update-survey-status",
      status: status
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
    console.log(SurveyState['survey']['questionOrder'].length);
    if (SurveyState['survey']['questionOrder'].length == 0 || SurveyState['survey']['title'] == "") {
      return true;
    } else {
      return false;
    }
  }

  function checkIfItemDone(item: string) {
    switch (item) {
      case "title": {
        if (SurveyState['survey'][item] == "") {
          return <SurveyitemComplete done={false} item="Survey Name"/>;
        } else {
          return <SurveyitemComplete done={true} item="Survey Name"/>
        }
      } case "questionOrder": {
        console.log(SurveyState['survey']['questionOrder'].length);
        if (SurveyState['survey']['questionOrder'].length < 1) {
          return <SurveyitemComplete done={false} item="At Least One Question"/>;
        } else {
          return <SurveyitemComplete done={true} item="At Least One Question"/>
        }
      }
      case "researcherMessage": {
        if (SurveyState['survey'][item] == "") {
          return <SurveyitemComplete done={false} item="Researcher Message"/>;
        } else {
          return <SurveyitemComplete done={true} item="Researcher Message"/>
        }
      }
      case "endMessage": {
        if (SurveyState['survey'][item] == "") {
          return <SurveyitemComplete done={false} item="End of Survey Message"/>;
        } else {
          return <SurveyitemComplete done={true} item="End of Survey Message"/>
        }
      }
      case "phone": {
        if (SurveyState['survey']['contactInfo'][item] == "") {
          return <SurveyitemComplete done={false} item="Phone Number"/>;
        } else {
          return <SurveyitemComplete done={true} item="Phone Number"/>
        }
      }
      case "email": {
        if (SurveyState['survey']['contactInfo'][item] == "") {
          return <SurveyitemComplete done={false} item="Email"/>;
        } else {
          return <SurveyitemComplete done={true} item="Email"/>
        }
      }
      case "mail": {
        if (SurveyState['survey']['contactInfo'][item] == "") {
          return <SurveyitemComplete done={false} item="Mailing Address"/>;
        } else {
          return <SurveyitemComplete done={true} item="Mailing Address"/>
        }
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm w-screen">
      <div className="flex h-auto w-3/5 flex-col justify-between gap-4 rounded-md border-2 border-rdsBlue bg-white dark:bg-rdsDark2 p-4">
        <h3 className="self-start justify-self-start text-xl font-bold">
          Survey Availability
        </h3>
        <h3 className="text-lg">Survey Checklist</h3>
        <div className="flex flex-row justify-around">
        <div className="">
        <h4>Required</h4>
        <div className="w-full h-1 bg-rdsDarkAccent2 rounded-lg"></div>
        <ul className="">
          <li>{checkIfItemDone("title")}</li>
          <li>{checkIfItemDone("questionOrder")}</li>
        </ul>
        </div>
        <div>
        <h4>Optional</h4>
        <div className="w-full h-1 bg-rdsDarkAccent2 rounded-lg"></div>
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
              className="rounded-md border-2 border-rdsBlue pl-2 pr-2"
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
              className="w-3/12 rounded-sm bg-rdsOrange pl-2 pr-2 text-white"
            >
              Close
            </button>
            <div className="flex flex-row gap-2">
              <button className="rounded-md border-2 border-rdsBlue text-black dark:text-white p-1" onClick={() => handleSurveyStatus(false)}>
                Pause Survey
              </button>
              <button className="rounded-md bg-rdsBlue py-1 pl-2 pr-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500" disabled={checkIfReadyToPublish()} onClick={() => handleSurveyStatus(true)}>
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
