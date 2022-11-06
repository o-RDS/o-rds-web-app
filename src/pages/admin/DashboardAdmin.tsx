import React from "react";
import StandardPage from "../../components/StandardPage";

export default function Dashboard() {
    return (
        <StandardPage>
            <div className="flex flex-col items-center">
                <h1>Welcome User</h1>
                <div className="flex flex-col w-5/6">
                <div className="flex flex-row">
                    <h3>Active Surveys</h3>
                    <button className="ml-auto bg-teal-500 rounded-md p-1">New Survey</button>
                </div>
                <div className="flex flex-row flex-wrap justify-evenly">
                    <div className="w-24 bg-lime-500 h-24 rounded-md">survey 1</div>
                    <div className="w-24 bg-lime-500 h-24 rounded-md">survey 2</div>
                    <div className="w-24 bg-lime-500 h-24 rounded-md">survey 3</div>
                    <div className="w-24 bg-lime-500 h-24 rounded-md">survey 4</div>
                </div>
                </div>
            </div>
        </StandardPage>
    )
}