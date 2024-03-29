import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import sampleResearcherLogo from "../images/sample_researcher_logo.png";
import contactResearcherIcon from "../images/contact_researcher.svg";
import ContactMenuModal from "./ContactMenuModal";

export default function SurveyTakerStandardPage(props: any) {
  const config: any = useOutletContext();
  const [displayModal, setDisplayModal] = useState(false);

  function test(str: string): boolean {
    console.log(str);
    return true;
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center">
        {config !== null &&
          config.contactInfo !== undefined &&
          (config.contactInfo.phone || config.contactInfo.email) && (
            <>
              <ContactMenuModal
                display={displayModal}
                setDisplay={setDisplayModal}
              />
              <div className="justify-start self-start px-2 pt-2">
                <button onClick={() => setDisplayModal(!displayModal)}>
                  <img src={contactResearcherIcon} />
                </button>
              </div>
            </>
          )}

        <div className="flex min-h-full w-full flex-grow flex-col items-center gap-y-6 p-6">
          <img src={sampleResearcherLogo} className="w-3/4 md:w-1/3 lg:w-1/4" />
          {props.children}
        </div>
      </div>
    </>
  );
}
