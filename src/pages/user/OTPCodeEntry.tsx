import React from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function OTPCodeEntry() {
    return(
        <SurveyTakerStandardPage>
            <div className="flex flex-col mt-10">
                <p>
                Your code has been sent to (###)###-####. <br /><br />
                Please enter it in the field below.
                </p>
            </div>
            <div className="flex flex-col mt-12">
                <label htmlFor="OTPCode">Code:<br /></label>
                <input type="text" id="OTPCode" name="OTPCode"  placeholder="*Code Format Here*" className="w-56 p-1 rounded bg-gray-200"></input>
                <button className="mt-6 p-1 w-56 rounded bg-orange-600 text-white">Submit</button>
            </div>
        </SurveyTakerStandardPage>
    )
}