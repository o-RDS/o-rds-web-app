import React from "react";
import StandardPage from "../../components/StandardPage";

function generateTableHeader(){
    //Will need to create the headers for each question (and other pertinent info)
}

function generateTableBody(){
    //A row will need to be generated for each response and filled in with appropriate data
}

export default function Results() {
    return (
        <StandardPage>
            <div className="flex flex-col w-full p-6 gap-y-2">
                <div className="flex flex-row w-full items-baseline">
                    <h1 className="flex-grow text-left text-2xl">Survey Name</h1>
                    <button className="p-2 w-fit rounded bg-rdsOrange text-white">Download CSV</button>
                </div>
                
                <table className="table-auto border-2 text-left">
                    <thead>
                        <tr className="border-b-2 bg-slate-600 text-white text-sm">
                            <th className="border-x-2 px-4 py-2">Test</th>
                            <th>Test</th>
                            <th>Test</th>
                            <th>Test</th>
                            <th>Test</th>
                            <th>Test</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b-2 bg-white">
                            <td className="border-x-2 px-4 py-2">Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                        </tr>
                        <tr>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                            <td>Answer</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </StandardPage>
    )
}