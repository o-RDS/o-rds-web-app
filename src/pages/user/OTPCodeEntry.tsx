import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { verificationCheck } from "../../APIs/Twilio";
import {
  addHash,
  generateAlias,
  writeSurveyResponse,
} from "../../APIs/Firebase";
import { setCookie } from "../../data/cookieFunctions";

export default function OTPCodeEntry() {
  const navigate = useNavigate();
  const params = useParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      window.sessionStorage.getItem("phone") == null ||
      params.id === undefined
    ) {
      navigate("..");
    }
  }, [navigate, params.id]);

  function verifyOTPCode() {
    if (code.length !== 6) {
      setError("Invalid Code");
      return;
    } else {
      let phone = window.sessionStorage.getItem("phone");
      if (phone != null) {
        console.log(`Running verification check: ${phone}, ${code}`);
        verificationCheck(phone, code).then((data) => {
          console.log(data);
          setCookie("token", data.accessToken, 1);
          if (data.statusCode === 200) {
            setError("");
            processHash();
          } else if (data.statusCode === 401) {
            setError("Invalid Code");
          } else {
            setError("Server Error, Try Again");
          }
        });
      }
    }
  }

  async function processHash() {
    let hash = window.sessionStorage.getItem("hash");
    if (hash && params.id !== undefined) {
      let response = await addHash(params.id);
      if (response.statusCode === 409) {
        //Existing Hash
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
            await writeSurveyResponse(params.id, alias, {
              answers: {},
              completed: false,
              alias: alias,
              responseID: responseID,
              parentID: window.sessionStorage.getItem("parent"),
              depth: window.sessionStorage.getItem("depth"),
            }).then((data) => {
              if (data.statusCode > 201) setError(data.message);
            });
            window.localStorage.setItem(params.id + hash, alias);
            navigate("../consent");
          }
        }
      }
    }
  }

  function displayPhone() {
    let num = window.sessionStorage.getItem("phone");
    if (num != null) {
      return (
        num.slice(0, 2) +
        "(" +
        num.slice(2, 5) +
        ") " +
        num.slice(5, 8) +
        "-" +
        num.slice(8, 12)
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
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col">
          <label htmlFor="OTPCode">
            Code:
            <br />
          </label>
          <input
            type="number"
            id="OTPCode"
            name="OTPCode"
            placeholder="######"
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
