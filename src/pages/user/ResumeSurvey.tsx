import React from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function ResumeSurvey(){
    return (
        <SurveyTakerStandardPage>
            <p className="max-w-prose">
                To resume your progress on the survey, please enter your X-digit resumption code below.
            </p>
            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col">
                    <label htmlFor="ResumptionCode">Resumption Code:<br /></label>
                    <input type="text" id="ResumptionCode" name="ResumptionCode"  placeholder="*Code Format Here*" className="w-56 p-1 rounded bg-gray-200"></input>
                </div>
                <button className="p-1 w-56 rounded bg-rdsOrange text-white">Submit</button>
            </div>
            <div className="mt-auto">
                <Link to="../">
                    <button className="text-rdsOrange hover:text-orange-800">Taking the survey for the first time?</button>
                </Link>
            </div>
        </SurveyTakerStandardPage>
    )
}