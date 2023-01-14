import React from "react";
import StandardPage from "../../components/StandardPage";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";

export default function SurveyBuilder() {
    return (
        <StandardPage>
            <div className="flex flex-row gap-20">
                <ConfigSidebar />
                <QuestionViewer />
            </div>
        </StandardPage>
    )
}