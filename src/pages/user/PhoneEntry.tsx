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

  // change to parent
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
    /* USE THIS CODE ONCE WE HAVE VALID SURVEY DATA (maybe)
           THERE ALSO NEEDS TO BE A FUNCTION TO GET USER DATA
        retrieveResponseData(parent).then((data) => {
            if (data == null) {
                navigate("/invalid");
            } else {
                depth = data.depth + 1;
                setChainInfo(parent, depth);
            }
        */
    let depthStr = searchParams.get("d");
    if (depthStr != null) {
      depth = parseInt(depthStr) + 1;
    }
    setChainInfo(parent, referer, depth);
  }, [searchParams, navigate]);

  function submitNum() {
    const cleanNum = "+1" + phoneNum.replace(/\W/g, "");

    if (cleanNum.length !== 12) {
      setError("Invalid Phone Number");
      return;
    }

    console.log(`Sending verification: ${cleanNum}`);
    startVerification(cleanNum).then((data) => {
      console.log(data);
      setPhone(cleanNum);
      console.log(cleanNum);
      if (data.statusCode === 200) {
        setError("");
        // will print code to console if server is running in testing mode
        if (data.code !== undefined) {
          console.log(`Verification Code: ${data.code}`);
        }
        navigate("verify");
      } else if (data.statusCode === 500) {
        setError("Server Error, Try Again Later");
      }
    });

    // TODO Send code to phone number, pass code to OTPCodeEntry.tsx
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
            onChange={(e) => setPhoneNum(e.target.value)}
          ></input>
        </div>
        <button
          className="w-56 rounded bg-rdsOrange p-1 text-white"
          onClick={() => submitNum()}
        >
          Submit
        </button>
        <p className="text-red-600">{error}</p>
      </div>
    </SurveyTakerStandardPage>
  );
}
