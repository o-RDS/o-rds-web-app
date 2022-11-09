import React from "react";
import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";

export default function Dashboard() {
    return (
        <StandardPage>
            <div>
                <h1>You made it to the dashboard</h1>
                <Link to="/SurveyBuilder">Go to Survey Builder</Link>
            </div>
        </StandardPage>
    )
}