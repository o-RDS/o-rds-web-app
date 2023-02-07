import React, { useContext } from "react";
import { TasksContext, TasksDispatchContext } from "../context/SurveyBuilderContext";
import floppydisc from "../images/floppydisc.png";
import settings from "../images/settingscog.png";

export default function SurveyTopConfig(props: any) {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  return (
    <div className="flex h-14 w-screen flex-row items-center justify-between border-black border-b pl-4 pr-4">
      <div className="flex gap-2">
        <input
          placeholder="Survey Name"
          className="rounded-md bg-gray-100 text-black"
          value={props.name}
          onChange={(e) => props.setSurveyName(e.target.value)}
        ></input>
        <img src={floppydisc} className="w-6 h-6 cursor-pointer"></img>
        <img src={settings} className="w-6 h-6 cursor-pointer" onClick={() => props.setSettings(!props.settings)}></img>
      </div>
      <p className="self-center">Last Updated: {task['survey']['lastUpdated']}</p>
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
