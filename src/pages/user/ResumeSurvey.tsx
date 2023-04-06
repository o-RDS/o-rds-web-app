import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function ResumeSurvey() {
  const [code, setCode] = useState("");
  const params = useParams();

  function handleSubmit() {
    if (code.length === 4) {
      if (
        window.sessionStorage.getItem("hash") != null &&
        params.id !== undefined
      ) {
        window.localStorage.setItem(
          params.id + window.sessionStorage.getItem("hash"),
          code
        );
      }
    }
  }

  return (
    <SurveyTakerStandardPage>
      <p className="max-w-prose">
        To resume your progress on the survey, please enter your resumption code
        below.
      </p>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col">
          <label htmlFor="ResumptionCode">
            Resumption Code:
            <br />
          </label>
          <input
            type="text"
            id="ResumptionCode"
            name="ResumptionCode"
            placeholder=""
            className="w-56 rounded bg-gray-200 p-1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></input>
        </div>
        <button
          className="w-56 rounded bg-rdsOrange p-1 text-white transition-all hover:shadow-md hover:shadow-black active:translate-y-1 active:shadow-none"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
      <div className="mt-auto">
        <Link to="..">
          <button className="text-rdsOrange hover:text-orange-800">
            Taking the survey for the first time?
          </button>
        </Link>
      </div>
    </SurveyTakerStandardPage>
  );
}
