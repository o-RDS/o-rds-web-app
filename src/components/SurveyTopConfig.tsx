import React, { useContext } from "react";
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

  function saveSurvey() {
    saveSurveyConfig("test", task["survey"]["id"], task["survey"]);
  }

  return (
    <div className="flex h-14 w-screen flex-row items-center justify-between border-b border-black pl-4 pr-4 dark:border-none dark:bg-rdsDark2 dark:text-white">
      <div className="flex gap-2">
        <input
          placeholder="Survey Name"
          className="border-b-2 border-gray-200 bg-inherit text-black transition-all focus:border-b-rdsBlue focus:outline-none dark:text-white"
          value={props.name}
          onChange={(e) => props.setSurveyName(e.target.value)}
          maxLength={20}
        ></input>
        <img
          src={floppydisc}
          className="h-6 w-6 cursor-pointer"
          onClick={() => saveSurvey()}
          alt="Save Button"
        ></img>
        <img
          src={settings}
          className="h-6 w-6 cursor-pointer"
          onClick={() => props.setSettings({active: !props.settings.active, whichSettings: "general"})}
          alt="Settings Button"
        ></img>
      </div>
      <p className="self-center">
        Last Updated: {task["survey"]["lastUpdated"]}
      </p>
      <div className="flex gap-2">
        <button className="rounded-sm border border-rdsBlue pl-2 pr-2 text-rdsBlue">
          Preview
        </button>
        <button
          className="rounded-sm bg-rdsBlue pl-2 pr-2 text-white"
          onClick={() => props.setShowModal(true)}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
