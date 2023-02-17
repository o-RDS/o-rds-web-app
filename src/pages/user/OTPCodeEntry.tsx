import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { verificationCheck } from "../../APIs/Twilio";
import {
  addHash,
  generateAlias,
  writeSurveyResponse,
} from "../../data/dataLayerManager";

export default function OTPCodeEntry() {
  const navigate = useNavigate();
  const params = useParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const TESTING = true;

  useEffect(() => {
    if (
      window.sessionStorage.getItem("phone") == null ||
      params.id === undefined
    ) {
      navigate("..");
    }
  }, []);

  function verifyOTPCode() {
    if (code.length !== 6) {
      setError("Invalid Code");
      return;
    } else {
      let phone = window.sessionStorage.getItem("phone");
      if (phone != null) {
        if (TESTING) {
          processHash();
        }
        console.log(`Running verification check: ${phone}, ${code}`);
        verificationCheck(phone, code).then((data) => {
          console.log(data);
          // processHash()
        });
      }
    }
  }

  async function processHash() {
    let hash = window.sessionStorage.getItem("hash");
    if (hash && params.id !== undefined) {
      let response = await addHash(params.id, hash);
      if (response) {
        //Existing Hash
        console.log("Existing Hash");
        if (response.isComplete) {
          navigate("../share");
        } else {
          navigate("../questions");
        }
      } else {
        //New Hash
        if (params.id !== undefined) {
          let result = await generateAlias(params.id);
          if (result) {
            console.log(response);
            let alias = result.alias;
            let responseID = result.responseID;
            writeSurveyResponse(params.id, alias, {
              completed: false,
              alias: alias,
              responseID: responseID,
            });
            window.localStorage.setItem(params.id + hash, alias);
            navigate("../questions");
          }
        }
      }
    }
  }

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
            className="w-56 rounded bg-gray-200 p-1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></input>
        </div>
        <button
          className="w-56 rounded bg-rdsOrange p-1 text-white"
          onClick={() => verifyOTPCode()}
        >
          Submit
        </button>
        <p className="text-red-600">{error}</p>
      </div>
    </SurveyTakerStandardPage>
  );
}
