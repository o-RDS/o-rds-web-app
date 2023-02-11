import React from "react";

export default function SurveySettings(props: any) {
    return (
        <>
      <div className="h-min-56 mt-3 flex flex-col gap-10 overflow-y-auto justify-center items-center w-screen dark:text-white">
        <div className="w-3/5 flex flex-col gap-10 rounded-md p-5 mt-1 mb-1 shadow-sm shadow-black dark:shadow-slate-900 dark:bg-rdsDarkAccent3">
          <div>
            <h2 className="text-2xl">Settings</h2>
            <div className="bg-rdsOrange h-1 rounded-md"></div>
          </div>
        </div>
      </div>
    </>
    )
}