import React from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function ResumeSurvey(){
    return (
        <SurveyTakerStandardPage>
            <p className="mt-10 max-w-prose">
                To resume your progress on the survey, please enter your X-digit resumption code below.
            </p>
            <div className="flex flex-col mt-12">
                <label htmlFor="ResumptionCode">Resumption Code:<br /></label>
                <input type="text" id="ResumptionCode" name="ResumptionCode"  placeholder="*Code Format Here*" className="w-56 p-1 rounded bg-gray-200"></input>
                <button className="mt-6 p-1 w-56 rounded bg-orange-600 text-white">Submit</button>
            </div>
            <div className="mt-auto">
                <Link to="/PhoneEntry">
                    <button className="text-orange-600 hover:text-orange-800">Taking the survey for the first time?</button>
                </Link>
            </div>
        </SurveyTakerStandardPage>
    )
}