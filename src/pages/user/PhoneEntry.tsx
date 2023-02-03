import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { setPhone, setChainInfo } from "../../data/sessionManager";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sha256 from "../../data/Sha256";
import { startVerification } from "../../APIs/Twilio"
import { start } from "repl";

export default function PhoneEntry() {
  const [phoneNum, setPhoneNum] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // change to parent
  useEffect(() => {
    let parent = searchParams.get("p");
    let depth = 0;
    if (parent == null) {
      navigate("/invalid");
    } else if (Sha256.hash(parent) === Sha256.hash("root")) {
        depth = 1;
        setChainInfo(parent, depth);
    } else {
        /* USE THIS CODE ONCE WE HAVE VALID SURVEY DATA
           THERE ALSO NEEDS TO BE A FUNCTION TO GET USER DATA
        retrieveResponseData(parent).then((data) => {
            if (data == null) {
                navigate("/invalid");
            } else {
                depth = data.depth + 1;
                setChainInfo(parent, depth);
            }
        */
        let depthStr = searchParams.get("d")
        if (depthStr != null) {
            depth = parseInt(depthStr) + 1;
            setChainInfo(parent, depth);
        } else {
            navigate("/invalid");
        }
    }
  }, [searchParams, navigate]);

  function submitNum() {
    let num = phoneNum.replace(/\W/g, "");

    if (num.length !== 10) {
      setError("Invalid Phone Number");
      return;
    }

    console.log(`Sending verification: ${phoneNum}`);
    startVerification(phoneNum)
      .then(data => {
        console.log(data)
    });

    setPhone(num);
    console.log(num);
    // TODO Send code to phone number, pass code to OTPCodeEntry.tsx
    navigate("verify");
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
        </div>
        <button
          className="p-1 w-56 rounded bg-rdsOrange text-white"
          onClick={() => submitNum()}
        >
          Submit
        </button>
        <p className="text-red-600">{error}</p>
      </div>
    </SurveyTakerStandardPage>
  );
}
