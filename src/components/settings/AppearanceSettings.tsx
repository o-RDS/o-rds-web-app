import React from "react";

export function AppearanceSettings() {
    return (
        <div className="flex flex-col gap-10 w-full pl-2 pr-2">
            <h3 className="text-3xl">Appearance</h3>
            <div className="flex flex-col gap-1">
        <label htmlFor="main-color">Main Color</label>
        <input
          type="number"
          id="main-color"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent bg-gray-200"
          maxLength={20}
        //   onChange={(e) => handlePaidRefChange(e)}
        //   value={SurveyState['survey']['maxRefIncentives']}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="accent-color">Accent Color</label>
        <input
          type="number"
          id="accent-color"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent bg-gray-200"
          maxLength={20}
        //   onChange={(e) => handleMaxRefChange(e)}
        //   value={SurveyState['survey']['maxRefs']}
        ></input>
      </div>
          </div>
    )
}