import React from "react";
import StandardPage from "../../components/StandardPage";
import MCQuestion from "../../components/MCQuestion";

export default function SurveyBuilder() {
    return (
        <StandardPage>
            <div>
                <h1>You made it to the survey builder</h1>
                <MCQuestion />
            </div>
        </StandardPage>
    )
}