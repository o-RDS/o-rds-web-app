import React from "react";

export function GeneralSettings() {
    return (
        <div>
            <h3 className="text-xl">General</h3>
            <p>Rsearcher Logo</p>
            <div className="flex flex-col">
              <label>Researcher Message</label>
              <textarea className="w-2/5"></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="end-survey-message">End of Survey Message</label>
              <textarea id="end-survey-message" className="w-2/5"></textarea>
            </div>
          </div>
    )
}