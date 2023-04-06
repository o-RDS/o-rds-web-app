import React, {useContext, useState} from "react";
import {
    SurveyContext,
    SurveyDispatchContext,
  } from "../../context/SurveyBuilderContext";

export function InformedConsentSettings() {
    const SurveyState = useContext(SurveyContext);
    const dispatch = useContext(SurveyDispatchContext);
    const [ICItem, setICItem] = useState([]);

    function handleICMessageChange(e: any) {
        let test: any = SurveyState;
        test["survey"]["informedConsent"]['message'] = e.target.value;
        dispatch({
          type: "update",
          questions: test["survey"],
          question: SurveyState["question"],
          change: true
        });
      }

      function handleICItemChange(e: any) {
        let test: any = SurveyState;
        test["survey"]["informedConsent"]['consentRequirements'] = e.target.value;
        dispatch({
          type: "update",
          questions: test["survey"],
          question: SurveyState["question"],
          change: true
        });
      }

      function handleICItemAdd(e: any) {
        let test: any = SurveyState;
        test["survey"]["informedConsent"]['consentRequirements'].push("New Option");
        console.log(test['survey']['informedConsent']['consentRequirements']);
        dispatch({
          type: "update",
          questions: test["survey"],
          question: SurveyState["question"],
          change: true
        });
      }

    return (
        <div className="flex flex-col gap-10 w-full pl-2 pr-2">
            <h3 className="text-3xl">Informed Consent</h3>
            <div className="flex flex-col gap-1">
        <label htmlFor="ICmessage">Informed Consent Message</label>
        <input
          type="text"
          id="ICmessage"
          className="rounded-sm p-1 dark:bg-rdsDarkAccent w-2/5"
          maxLength={20}
          value={SurveyState['survey']['informedConsent']['message']}
          onChange={(e) => handleICMessageChange(e)}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="consent-requirements">Consent Requirements</label>
      <textarea id="consent-requirements" value={SurveyState['survey']['informedConsent']['consentRequirements']} onChange={(e) => handleICItemChange(e)} className="rounded-sm p-1 dark:bg-rdsDarkAccent w-3/5 h-96"></textarea>
      </div>
          </div>
    )
}