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
                        <Link to="../survey-builder">
                            <button className="bg-rdsBlue rounded-md p-1 pl-2 pr-2 text-white">New Survey</button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap gap-10">
                    <Link to="../results">
                        <div className="flex flex-col justify-end w-24 bg-rdsBlue text-white h-24 rounded-md p-2">survey 1</div>
                    </Link>
                    <div className="flex flex-col justify-end w-24 bg-rdsBlue text-white h-24 rounded-md p-2">survey 2</div>
                    <div className="flex flex-col justify-end w-24 bg-rdsBlue text-white h-24 rounded-md p-2">survey 3</div>
                    <div className="flex flex-col justify-end w-24 bg-rdsBlue text-white h-24 rounded-md p-2">survey 4</div>
                </div>
                </div>
            </div>
        </StandardPage>
    )
}