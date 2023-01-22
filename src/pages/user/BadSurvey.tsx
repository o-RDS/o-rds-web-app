import React from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function BadSurvey(){
    return (
        <SurveyTakerStandardPage>
            <p className="max-w-prose">
                We're sorry, but the survey you are trying to access is no longer available.
            </p>
        </SurveyTakerStandardPage>
    )
}