import React, {useState} from "react";

const SurveyLinkModal = (props:any) => {
    const [copyLabel, setCopyLabel] = useState("Copy");
    if (!props.display) {
        return <></>;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(`http://localhost:3000/survey/${props.surveyID}`);
        setCopyLabel("Copied");
        setTimeout(() => {
          setCopyLabel("Copy");
        }, 2000);
      }

    return (
        <div className="flex top-0 left-0 bottom-0 right-0 justify-center items-center z-50 fixed backdrop-blur-sm">
            <div className="flex flex-col gap-3 w-2/5 bg-white rounded-md p-4 border-2 border-rdsBlue">
                <h1>Share Survey Link</h1>
                <p>Use the button below to copy the link to distribute your survey.</p>
                <div className="flex flex-row gap-5 justify-center">
                    <div className="border-2 border-rdsOrange rounded-md pl-2 pr-2">http://localhost:3000/survey/{props.surveyID}</div>
                    <button className="border-2 border-rdsBlue rounded-md pl-2 pr-2" onClick={() => copyToClipboard()}>{copyLabel}</button>
                </div>
                <button onClick={() => props.showModal(false)} className="bg-rdsOrange pl-2 pr-2 rounded-sm text-white">Close</button>
            </div>
        </div>
    );
};

export default SurveyLinkModal;