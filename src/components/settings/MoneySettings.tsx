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
    // if (test['survey']['maxRefs'] === Number.isNaN) {
    //   test['survey']['maxRefs'] = 0;
    // }
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true,
    });
  }

  function handleReferralAmountChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["refPayout"] = parseInt(e.target.value);
    // if (test['survey']['maxRefs'] === Number.isNaN) {
    //   test['survey']['maxRefs'] = 0;
    // }
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true,
    });
  }

  function handleMaxRefChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["maxRefs"] = parseInt(e.target.value);
    /*if (Number.isNaN(test['survey']['maxRefs'])) {
      test['survey']['maxRefs'] = 0;
    }*/
    console.log(test["survey"]["maxRefs"]);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true,
    });
  }

  function handlePaidRefChange(e: any) {
    let test: any = SurveyState;
    test["survey"]["maxRefIncentives"] = parseInt(e.target.value);
    // if (test['survey']['maxRefIncentives'] === Number.isNaN) {
    //   test['survey']['maxRefIncentives'] = 0;
    // }
    console.log(test["survey"]["maxRefIncentives"]);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true,
    });
  }

  return (
    <div className="flex w-full flex-col gap-10 pl-2 pr-2">
      <h3 className="text-3xl">Referrals & Payments</h3>
      <div className="flex flex-col gap-1">
        <label htmlFor="num-referrals">Maximum Paid Referrals</label>
        <input
          type="number"
          id="num-referrals"
          className="w-2/5 rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
          maxLength={20}
          onChange={(e) => handlePaidRefChange(e)}
          value={SurveyState["survey"]["maxRefIncentives"]}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="referrals-max">Maximum Referrals</label>
        <input
          type="number"
          id="referrals-max"
          className="w-2/5 rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
          maxLength={20}
          onChange={(e) => handleMaxRefChange(e)}
          value={SurveyState["survey"]["maxRefs"]}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="completion-amount">Completion Amount</label>
        <input
          type="number"
          id="completion-amount"
          className="w-2/5 rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
          onChange={(e) => handleCompletionAmountChange(e)}
          value={SurveyState["survey"]["completionPayout"]}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="referral-amount">Referral Amount</label>
        <input
          type="number"
          id="referral-amount"
          className="w-2/5 rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
          onChange={(e) => handleReferralAmountChange(e)}
          value={SurveyState["survey"]["refPayout"]}
        ></input>
      </div>
    </div>
  );
}
