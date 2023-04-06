import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function Consent() {
  const navigate = useNavigate();
  const config: any = useOutletContext();
  const [ackChecked, setAckChecked] = useState(false);

  useEffect(() => {
    //Config error-checking code here?
  });

  return (
    <SurveyTakerStandardPage>
      <div className="flex w-3/4 flex-col items-center justify-center gap-y-4">
        <p className="whitespace-normal text-left">
          You will now be asked to provide your consent to participate in this
          study. Please read the consent information below.
        </p>
        <hr className="border-1 w-1/3 border-gray-800" />
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <p className="w-11/12 whitespace-pre-wrap break-words text-left">
            {config.informedConsent.consentRequirements}
          </p>
        </div>
        <hr className="border-1 w-1/3 border-gray-800" />
        <div className="flex flex-row justify-center">
          <input
            type="checkbox"
            id="acknowledge"
            name="acknowledge"
            className="mr-4"
            onChange={() => setAckChecked(!ackChecked)}
          />
          <label htmlFor="acknowledge">
            I acknowledge that I have read the consent information listed above
            and give my consent to participate in this study.
          </label>
        </div>
        <button
          disabled={!ackChecked}
          className="w-56 rounded bg-rdsOrange p-1 text-white disabled:opacity-60"
          onClick={() => navigate("../questions")}
        >
          Accept
        </button>
      </div>
    </SurveyTakerStandardPage>
  );
}
