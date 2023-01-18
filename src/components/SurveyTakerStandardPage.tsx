import react from "react";
import sampleResearcherLogo from "../images/sample_researcher_logo.png"
import contactResearcherIcon from "../images/contact_researcher_icon.png"

export default function SurveyTakerStandardPage(props: any){
    return(
        <>
            <div className="flex flex-col items-center h-screen w-screen p-6">
                <div className="self-start justify-start">
                    <img src={contactResearcherIcon} />
                </div>
                <div className="flex flex-col items-center mt-8 h-full">
                    <img src={sampleResearcherLogo}/>
                    {props.children}
                </div>
            </div>
        </>
    )

}