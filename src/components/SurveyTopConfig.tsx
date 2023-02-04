import React from "react";

export default function SurveyTopConfig(props: any) {
    return (
        <div className="flex flex-row justify-between h-14 w-screen border border-black items-center pl-4 pr-4">
            <div className="flex gap-2">
            <input
              placeholder="Survey Name"
              className="rounded-md bg-gray-100 text-black"
              value={props.surveyName}
              onChange={(e) => props.setSurveyName(e.target.value)}
            ></input>
            <p>Settings</p>
            </div>
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
    )
}