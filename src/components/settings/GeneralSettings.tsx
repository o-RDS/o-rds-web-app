import React, { useContext } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../context/SurveyBuilderContext";
import ords from "../../images/ords.png";

export function GeneralSettings() {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  function handleNameChange(e: any) {
    let test: any = task;
    test["survey"]["title"] = e.target.value;
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleStartMessageChange(e: any) {
    let test: any = task;
    test["survey"]["researcherMessage"] = e.target.value;
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  function handleEndMessageChange(e: any) {
    let test: any = task;
    test["survey"]["endSurveyMessage"] = e.target.value;
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
    });
  }

  return (
    <div className="flex w-11/12 flex-col gap-10 pl-2 pr-2">
      <div>
        <h3 className="text-3xl">General</h3>
        <div className="flex flex-row gap-10">
          <div>
            <p>Rsearcher Logo</p>
            <img
              src={ords}
              className="h-32 w-32 rounded-full shadow-sm shadow-rdsDarkAccent2"
              alt="Researcher Logo"
            ></img>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="survey-name">Survey Name</label>
            <input
              type="text"
              id="survey-name"
              className="rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
              maxLength={20}
              onChange={(e) => handleNameChange(e)}
              value={task['survey']['title']}
            ></input>
          </div>
        </div>
      </div>
      <div className="h-1 w-11/12 bg-rdsDarkAccent"></div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="survey-message">Researcher Message</label>
          <textarea
            id="survey-message"
            className="w-2/5 rounded-sm dark:bg-rdsDarkAccent bg-gray-200 p-1"
            onChange={(e) => handleStartMessageChange(e)}
            value={task['survey']['researcherMessage']}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="end-survey-message">End of Survey Message</label>
          <textarea
            id="end-survey-message"
            className="w-2/5 rounded-sm dark:bg-rdsDarkAccent bg-gray-200 p-1"
            onChange={(e) => handleEndMessageChange(e)}
            value={task['survey']['endSurveyMessage']}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
