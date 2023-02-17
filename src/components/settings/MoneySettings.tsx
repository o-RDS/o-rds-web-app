import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";

export function MoneySettings() {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);

  function handleCompletionAmountChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["completionPayout"] = parseInt(e.target.value);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true
    });
  }

  function handleReferralAmountChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["refPayout"] = parseInt(e.target.value);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true
    });
  }

  function handleNumRefChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["maxRefs"] = parseInt(e.target.value);
    console.log(test["survey"]["maxRefs"]);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true
    });
  }

  function handleMaxRefChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["refPayout"] = parseInt(e.target.value);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true
    });
  }

  return (
    <div className="flex w-full flex-col gap-10 pl-2 pr-2">
      <h3 className="text-3xl">Referrals & Payments</h3>
      <div className="flex flex-col gap-1">
        <label htmlFor="num-referrals">Number of Referrals - Paid</label>
        <input
          id="num-referrals"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent"
          maxLength={20}
          onChange={(e) => handleNumRefChange(e)}
          value={SurveyState['survey']['maxRefs']}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="referrals-max">Referrals - Max</label>
        <input
          id="referrals-max"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent"
          value={SurveyState['survey']['maxRefs']}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="completion-amount">Completion Amount</label>
        <input
          id="completion-amount"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent"
          onChange={(e) => handleCompletionAmountChange(e)}
          value={SurveyState['survey']['completionPayout']}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="referral-amount">Referral Amount</label>
        <input
          id="referral-amount"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent"
          onChange={(e) => handleReferralAmountChange(e)}
          value={SurveyState['survey']['refPayout']}
        ></input>
      </div>
    </div>
  );
}
