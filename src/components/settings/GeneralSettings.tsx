import React, { useContext } from "react";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";
import ords from "../../images/ords.png";

export function GeneralSettings() {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);

  function handleInputChange(e: any, input: string) {
    let test: any = SurveyState;
    test["survey"][input] = e.target.value;
    dispatch({
      type: "general-update",
      property: input,
      value: e.target.value,
    });
  }

  function handleAddAdmin() {
    const admin: any = (
      document.getElementById("add-admin") as HTMLInputElement
    ).value;
    console.log(admin);
    (document.getElementById("add-admin") as HTMLInputElement).value = "";
    dispatch({
      type: "add-admin",
      admin: admin,
    });
  }

  return (
    <div className="flex w-11/12 flex-col gap-10 pl-2 pr-2">
      <div>
        <h3 className="text-3xl">General</h3>
        <div className="flex flex-row gap-10">
          <div>
            <p>Researcher Logo</p>
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
              className="w-full rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
              maxLength={50}
              onChange={(e) => handleInputChange(e, "title")}
              value={SurveyState["survey"]["title"]}
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
            className="w-2/5 rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
            onChange={(e) => handleInputChange(e, "researcherMessage")}
            value={SurveyState["survey"]["researcherMessage"]}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="end-survey-message">End of Survey Message</label>
          <textarea
            id="end-survey-message"
            className="w-2/5 rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
            onChange={(e) => handleInputChange(e, "endSurveyMessage")}
            value={SurveyState["survey"]["endSurveyMessage"]}
          ></textarea>
        </div>
      </div>
      <div className="h-1 w-11/12 bg-rdsDarkAccent"></div>
      <div className="flex flex-col gap-1">
        <label htmlFor="survey-name">Add Admin</label>
        <input
          type="text"
          id="add-admin"
          className="w-1/5 rounded-sm bg-gray-200 p-1 dark:bg-rdsDarkAccent"
          maxLength={20}
          placeholder="Use Admin Email"
        ></input>
        <button
          className="w-1/5 bg-rdsOrange text-white"
          onClick={() => handleAddAdmin()}
        >
          Add Admin
        </button>
      </div>
    </div>
  );
}
