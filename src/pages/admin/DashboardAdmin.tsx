import React from "react";
import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";

export default function Dashboard() {
    return (
        <StandardPage>
            <div className="flex flex-col items-center">
                <h1>Welcome User</h1>
                <div className="flex flex-col w-5/6">
                <div className="flex flex-row">
                    <h3 className="text-2xl">Active Surveys</h3>
                    <div className="ml-auto">
                        <Link to="/SurveyBuilderAdmin">
                            <button className="bg-rdsBlue rounded-md p-1 pl-2 pr-2 text-white">New Survey</button>
                        </Link>
                    </div>
                </div>
                <br></br>
                <div className="flex flex-row flex-wrap gap-10">
                    <Link to="/ResultsAdmin">
                        <div className="flex flex-col justify-end w-48 bg-rdsBlue text-white h-48 rounded-md p-2"><div className="border-t"><h4 className="text-md font-bold">survey 1</h4><p className="text-sm">0 Responses</p></div></div>
                    </Link>
                    <div className="flex flex-col justify-end w-48 bg-rdsBlue text-white h-48 rounded-md p-2"><div className="border-t"><h4 className="text-md font-bold">survey 1</h4><p className="text-sm">0 Responses</p></div></div>
                    <div className="flex flex-col justify-end w-48 bg-rdsBlue text-white h-48 rounded-md p-2"><div className="border-t"><h4 className="text-md font-bold">survey 1</h4><p className="text-sm">0 Responses</p></div></div>
                    <div className="flex flex-col justify-end w-48 bg-rdsBlue text-white h-48 rounded-md p-2"><div className="border-t"><h4 className="text-md font-bold">survey 1</h4><p className="text-sm">0 Responses</p></div></div>
                </div>
                </div>
            </div>
        </StandardPage>
    )
}