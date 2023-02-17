import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { saveSurveyConfig } from "../data/dataLayerManager";
import {
  TasksContext,
  TasksDispatchContext,
} from "../context/SurveyBuilderContext";
import floppydisc from "../images/floppydisc.png";
import settings from "../images/settingscog.png";

export default function SurveyTopConfig(props: any) {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const [open, setOpen] = useState(false);
  const [surveyStatus, setSurveyStatus] = useState(renderStatus());

  function renderStatus() {
    if (task['change'] == true) {
      return ({
        colors: "border-yellow-500 text-yellow-500 bg-yellow-500 bg-opacity-10",
        active: "Pending Changes",
      })
    } else if (task['survey']['live'] == true) {
      return ({
        colors: "border-green-500 text-green-500 bg-green-500 bg-opacity-10",
        active: "Active",
      });
    } else {
      return ({
        colors: "border-red-500 text-red-500 bg-red-500 bg-opacity-10",
        active: "Inactive",
      });
    }
  }

  function saveSurvey() {
    if (task['change']) {
      saveSurveyConfig("test", task["survey"]["id"], task["survey"]);
    }
    dispatch({
      type: 'question-prompt',
      questions: task['survey'],
      question: task['question'],
      change: false
    })
  }

  return (
    <div className="flex h-14 w-screen flex-row items-center justify-between border-b border-black pl-4 pr-4 dark:border-none dark:bg-rdsDark2 dark:text-white">
      <div className="flex gap-2">
        <p onClick={() => setOpen(!open)}>{props.name}</p>
        <img
          src={floppydisc}
          className="h-6 w-6 cursor-pointer"
          onClick={() => saveSurvey()}
          alt="Save Button"
        ></img>
        <img
          src={settings}
          className="h-6 w-6 cursor-pointer"
          onClick={() =>
            props.setSettings({
              active: !props.settings.active,
              whichSettings: "general",
            })
          }
          alt="Settings Button"
        ></img>
      </div>
      <p className="self-center">
        Last Updated: {task["survey"]["lastUpdated"]}
      </p>
      <div className="flex gap-2">
        <div className={`rounded-sm border ${renderStatus().colors} pl-2 pr-2 transition-all`}>
          {renderStatus().active}
        </div>
        <button
          className="rounded-sm bg-rdsBlue pl-2 pr-2 text-white"
          onClick={() => props.setShowModal(true)}
        >
          Publish
        </button>
      </div>
      {open && (
        <div className="fixed top-28 flex flex-col rounded-md bg-white p-1 text-black dark:bg-rdsDarkAccent2 dark:text-white">
          <Link to="../results">Results</Link>
          <Link to="../survey-builder">Survey Builder</Link>
        </div>
      )}
    </div>
  );
}
