import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { setPhone, setChainInfo } from "../../data/sessionManager";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { startVerification } from "../../APIs/Twilio";

export default function PhoneEntry() {
  const [phoneNum, setPhoneNum] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    let parent = searchParams.get("p");
    let referer = searchParams.get("r");
    let depth = 1;
    if (parent == null || parent === "null") {
      parent = "root";
    }
    if (referer == null || referer === "null") {
      referer = "root";
    }
    let depthStr = searchParams.get("d");
    if (depthStr != null) {
      depth = parseInt(depthStr) + 1;
    }
    setChainInfo(parent, referer, depth);
  }, [searchParams, navigate]);

  function submitNum() {
    if (!phoneNum) {
      setError("Please enter a phone number");
      return;
    }
    const cleanNum = phoneNum.replace(/\W/g, "");
    if (!cleanNum) {
      setError("Invalid phone number");
      return;
    }
    console.log(`Sending verification: ${cleanNum}`);
    startVerification(cleanNum)
      .then((data) => {
        console.log(data);
        console.log(cleanNum);
        if (data.statusCode === 200) {
          setError("");
          setPhone(data.phoneNumber);
          if (data.code !== undefined) {
            console.log(`Verification Code: ${data.code}`);
          }
          navigate("verify");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError("Error Connecting To Server, Try Again Later");
      });
  }

  return (
    <SurveyTakerStandardPage>
      <div className="flex max-w-prose flex-col">
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
      <div className="flex flex-col items-center gap-y-6">
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
            className="w-56 rounded bg-gray-200 p-1"
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
              setError("");
            }}
          ></input>
        </div>
        <button
          className="w-56 rounded bg-rdsOrange p-1 text-white transition-all hover:shadow-md hover:shadow-black active:translate-y-1 active:shadow-none"
          onClick={() => submitNum()}
        >
          Submit
        </button>
        <p className="text-red-600">{error}</p>
      </div>
    </SurveyTakerStandardPage>
  );
}
