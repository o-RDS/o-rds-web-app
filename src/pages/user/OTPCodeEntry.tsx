import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { verificationCheck } from "../../APIs/Twilio"

export default function OTPCodeEntry() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function verifyOTPCode() {
    if (code.length !== 6) {
      setError("Invalid Code");
      return;
    } else {
      let phone = window.sessionStorage.getItem("phone");
      if (phone != null)
        console.log(`Running verification check: ${phone}, ${code}`);
        verificationCheck(phone, code)
          .then(data => {
            console.log(data.status)
        });
    }
  }

  useEffect(() => {
    if (window.sessionStorage.getItem("phone") == null) {
      navigate("..");
    }
  }, []);

  function displayPhone() {
    let num = window.sessionStorage.getItem("phone");
    if (num != null) {
      return (
        "(" + num.slice(0, 3) + ") " + num.slice(3, 6) + "-" + num.slice(6, 10)
      );
    } else {
      console.log("You shouldn't be here! (No Phone Number Found)");
      return "Invalid Phone Number";
    }
  }

  return (
    <SurveyTakerStandardPage>
      <div className="flex flex-col">
        <p>
          Your code has been sent to {displayPhone()}. <br />
          <br />
          Please enter it in the field below.
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col">
          <label htmlFor="OTPCode">
            Code:
            <br />
          </label>
          <input
            type="text"
            id="OTPCode"
            name="OTPCode"
            placeholder="*Code Format Here*"
            className="w-56 p-1 rounded bg-gray-200"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></input>
        </div>
        <button
          className="p-1 w-56 rounded bg-rdsOrange text-white"
          onClick={() => verifyOTPCode()}
        >
          Submit
        </button>
        <p className="text-red-600">{error}</p>
      </div>
    </SurveyTakerStandardPage>
  );
}
