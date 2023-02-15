import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../context/SurveyBuilderContext";

export function MoneySettings() {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  function handleCompletionAmountChange(e: any) {
    let test: any = task;
    test["survey"]["completionPayout"] = parseInt(e.target.value);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleReferralAmountChange(e: any) {
    let test: any = task;
    test["survey"]["refPayout"] = parseInt(e.target.value);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleNumRefChange(e: any) {
    let test: any = task;
    test["survey"]["maxRefs"] = parseInt(e.target.value);
    console.log(test["survey"]["maxRefs"]);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleMaxRefChange(e: any) {
    let test: any = task;
    test["survey"]["refPayout"] = parseInt(e.target.value);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
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
          value={task['survey']['maxRefs']}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="referrals-max">Referrals - Max</label>
        <input
          id="referrals-max"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent"
          value={task['survey']['maxRefs']}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="completion-amount">Completion Amount</label>
        <input
          id="completion-amount"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent"
          onChange={(e) => handleCompletionAmountChange(e)}
          value={task['survey']['completionPayout']}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="referral-amount">Referral Amount</label>
        <input
          id="referral-amount"
          className="w-2/5 rounded-sm p-1 dark:bg-rdsDarkAccent"
          onChange={(e) => handleReferralAmountChange(e)}
          value={task['survey']['refPayout']}
        ></input>
      </div>
    </div>
  );
}
