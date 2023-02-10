import React from "react";

export default function SurveySettings(props: any) {
    return (
        <>
      <div className="h-min-56 mt-3 flex flex-col gap-10 overflow-y-auto justify-center items-center w-screen">
        <div className="w-3/5 flex flex-col gap-10 rounded-md p-5 mt-1 mb-1 shadow-sm shadow-black">
          <div>
            <h2 className="text-2xl">Settings</h2>
            <div className="bg-rdsOrange w-3/5 h-1 rounded-md"></div>
          </div>
          <div>
            <h3>General</h3>
          </div>
          <div>
            <h3>Appearance</h3>
          </div>
          <div>
            <h3>Referrals & Payments</h3>
            <div>
              <label>Number of Referrals</label>
              <input type="text"></input>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}