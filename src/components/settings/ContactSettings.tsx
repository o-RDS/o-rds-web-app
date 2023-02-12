import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../context/SurveyBuilderContext";

export function ContactSettings() {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  function handlePhoneChange(e: any) {
    let test: any = task;
    test["survey"]["contactInfo"]['phone'] = e.target.value;
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleEmailChange(e: any) {
    let test: any = task;
    test["survey"]["contactInfo"]['email'] = e.target.value;
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleMailChange(e: any) {
    let test: any = task;
    test["survey"]["contactInfo"]['mail'] = e.target.value;
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  return (
    <div className="flex w-full flex-col gap-10 pl-2 pr-2">
      <h2 className="text-3xl">Contact Information</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          className="rounded-sm p-1 dark:bg-rdsDarkAccent w-2/5"
          maxLength={20}
          value={task['survey']['contactInfo']['phone']}
          onChange={(e) => handlePhoneChange(e)}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
      <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="rounded-sm p-1 dark:bg-rdsDarkAccent w-2/5"
          maxLength={20}
          value={task['survey']['contactInfo']['email']}
          onChange={(e) => handleEmailChange(e)}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
      <label htmlFor="mail">Mailing Address</label>
        <input
          type="text"
          id="mail"
          className="rounded-sm p-1 dark:bg-rdsDarkAccent w-2/5"
          maxLength={20}
          value={task['survey']['contactInfo']['mail']}
          onChange={(e) => handleMailChange(e)}
        ></input>
      </div>
    </div>
  );
}
