import React from "react";
import StandardPage from "../../components/StandardPage";
import MCQuestion from "../../components/MCQuestion";

export default function SurveyBuilder() {
    return (
        <StandardPage>
            <p>This is the survey builder</p>
            <MCQuestion />
        </StandardPage>
    )
}