import React, {useState} from "react";
import sampleResearcherLogo from "../images/sample_researcher_logo.png";
import contactResearcherIcon from "../images/contact_researcher_icon.png";
import ContactMenuModal from "./ContactMenuModal";

export default function SurveyTakerStandardPage(props: any) {
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center gap-y-3 p-6">
        <ContactMenuModal 
          display={displayModal}
          setDisplay={setDisplayModal}
        />
        <div className="justify-start self-start">
          <button
            onClick={() => setDisplayModal(!displayModal)}
          >
            <img src={contactResearcherIcon}/>
          </button>
        </div>
        <div className="flex h-full w-full flex-col items-center gap-y-8">
          <img src={sampleResearcherLogo} className="w-3/4 md:w-1/3 lg:w-1/4" />
          {props.children}
        </div>
      </div>
    </>
  );
}
