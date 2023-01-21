import React from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { setPhone, setSurveyID } from "../../data/sessionManager";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PhoneEntry() {
  const [phoneNum, setPhoneNum] = React.useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    let id = searchParams.get("s");
    if (id != null) {
      setSurveyID(id);
    }
    // TODO Check if user has already taken survey/if survey is valid
    console.log(window.sessionStorage.getItem("surveyID"));
  }, [searchParams]);

  function submitNum() {
    let num = phoneNum.replace(/\W/g, "");

    if (num.length !== 10) {
      setError("Invalid Phone Number");
      return;
    }

    setPhone(num);
    console.log(num);
    // TODO Send code to phone number, pass code to OTPCodeEntry.tsx
    navigate("/OTPCodeEntry");
  }

  return (
    <SurveyTakerStandardPage>
      <div className="flex flex-col max-w-prose">
        <p>
          Before you begin the survey, we must verify that you have not yet
          taken the survey.
          <br />
          <br />
          Please enter your phone number in the field below so that you may be
          sent a code to verify your phone number.
          <br />
          <br />
          Your phone number will not be associated with your responses and will
          only be used for verification purposes.
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col">
          <label htmlFor="phoneNumber">
            Phone Number:
            <br />
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="(XXX) XXX-XXXX"
            className="w-56 p-1 rounded bg-gray-200"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          ></input>
          <p className="text-red-600">{error}</p>
        </div>
        <button
          className="mt-6 p-1 w-56 rounded bg-orange-600 text-white"
          onClick={() => submitNum()}
        >
          Submit
        </button>
      </div>
    </SurveyTakerStandardPage>
  );
}
