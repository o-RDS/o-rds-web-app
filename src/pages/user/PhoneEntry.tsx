import React from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function PhoneEntry() {
    return (
        <SurveyTakerStandardPage>      
            <div className="flex flex-col mt-10">
                <p>
                Before you begin the survey, we must verify that you have not yet taken the survey.<br /><br />

                Please enter your phone number in the field below so that you may be sent a code to verify your phone number.<br /><br />

                Your phone number will not be associated with your responses and will only be used for verification purposes.
                </p>
            </div>
            <div className="flex flex-col mt-12">
                <label htmlFor="phoneNumber">Phone Number:<br /></label>
                <input type="text" id="phoneNumber" name="phoneNumber"  placeholder="(XXX) XXX-XXXX" className="w-56 p-1 rounded bg-gray-200"></input>
                <Link to="/OTPCodeEntry">
                    <button className="mt-6 p-1 w-56 rounded bg-orange-600 text-white">Submit</button>
                </Link>
            </div>
            <div className="mt-auto">
                <Link to="/ResumeSurvey">
                    <button className="text-orange-600 hover:text-orange-800">Already began the survey?</button>
                </Link>
            </div>
        </SurveyTakerStandardPage>
    )

}