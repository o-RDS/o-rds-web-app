import react from "react";
import sampleResearcherLogo from "../images/sample_researcher_logo.png";
import contactResearcherIcon from "../images/contact_researcher_icon.png";

export default function SurveyTakerStandardPage(props: any) {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center gap-y-3 p-6">
        {
          <div className="justify-start self-start">
            <img src={contactResearcherIcon} />
          </div>
        }
        <div className="flex h-full w-full flex-col items-center gap-y-8">
          <img src={sampleResearcherLogo} className="w-3/4 md:w-1/3 lg:w-1/4" />
          {props.children}
        </div>
      </div>
    </>
  );
}
