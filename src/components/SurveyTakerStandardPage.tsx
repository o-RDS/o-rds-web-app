import react from "react";
import sampleResearcherLogo from "../images/sample_researcher_logo.png"
import contactResearcherIcon from "../images/contact_researcher_icon.png"

export default function SurveyTakerStandardPage(props: any){
    return(
        <>
            <div className="flex flex-col items-center h-screen w-screen p-6 gap-y-3">
                {<div className="self-start justify-start">
                    <img src={contactResearcherIcon}/>
                </div>}
                <div className="flex flex-col items-center w-full h-full gap-y-8">
                    <img src={sampleResearcherLogo} className="w-3/4 md:w-1/3 lg:w-1/4"/>
                    {props.children}
                </div>
            </div>
        </>
    )

}