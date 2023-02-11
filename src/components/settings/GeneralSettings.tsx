import React, { useContext } from "react";
import { useActionData } from "react-router-dom";
import { TasksContext, TasksDispatchContext } from "../../context/SurveyBuilderContext";
import ords from "../../images/ords.png";

export function GeneralSettings() {
    const task = useContext(TasksContext);
    const dispatch = useContext(TasksDispatchContext);

    function handleNameChange() {

    }

    function handleStartMessageChange() {

    }

    function handleEndMessageChange() {

    }
    
  return (
    <div className="flex flex-col gap-10 w-11/12 pl-2 pr-2">
      <div>
        <h3 className="text-3xl">General</h3>
        <div className="flex flex-row gap-10">
          <div>
            <p>Rsearcher Logo</p>
            <img src={ords} className="h-32 w-32 rounded-full" alt="Researcher Logo"></img>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="survey-name">Survey Name</label>
            <input type="text" id="survey-name" className="rounded-sm dark:bg-rdsDarkAccent p-1" maxLength={20}></input>
          </div>
        </div>
      </div>
      <div className="h-1 w-11/12 bg-rdsDarkAccent"></div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="survey-message">Researcher Message</label>
          <textarea id="survey-message" className="w-2/5 dark:bg-rdsDarkAccent rounded-sm"></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="end-survey-message">End of Survey Message</label>
          <textarea id="end-survey-message" className="w-2/5 dark:bg-rdsDarkAccent rounded-sm"></textarea>
        </div>
      </div>
    </div>
  );
}
