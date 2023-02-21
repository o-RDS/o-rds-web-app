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

      function handleICItemChange(e: any, index: any) {
        let test: any = SurveyState;
        test["survey"]["informedConsent"]['ICList'][index] = e.target.value;
        dispatch({
          type: "update",
          questions: test["survey"],
          question: SurveyState["question"],
          change: true
        });
      }

      function handleICItemAdd(e: any) {
        let test: any = SurveyState;
        test["survey"]["informedConsent"]['ICList'].push("New Option");
        console.log(test['survey']['informedConsent']['ICList']);
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
        <ol className="flex flex-col gap-2 list-decimal">{SurveyState['survey']['informedConsent']['ICList'].map((item: any, index: any) => {
            return (<textarea value={item} onChange={(e) => handleICItemChange(e, index)} className="rounded-sm p-1 dark:bg-rdsDarkAccent w-2/5"></textarea>)
        })}</ol>
        <button onClick={(e) => handleICItemAdd(e)} className="w-fit text-left bg-rdsBlue p-2">Add Item</button>
      </div>
          </div>
    )
}