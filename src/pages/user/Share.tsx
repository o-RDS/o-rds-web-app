import { useState } from "react";
import ShareBox from "../../components/ShareBox";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { useOutletContext } from "react-router-dom";
import Loading from "../../components/Loading";
import { isEmail, newOrder } from "./ReceivePayment";
import { sendPayment } from "../../APIs/Tremendous";

export default function Share() {
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const config: any = useOutletContext();

  function getLink() {
    let link = window.location.href;
    link = link.replace(
      "/share",
      "?r=" +
        window.sessionStorage.getItem("hash") +
        "&p=" +
        window.sessionStorage.getItem("responseID") +
        "&d=" +
        window.sessionStorage.getItem("depth")
    );
    return link;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(getLink());
    setCopyLabel("Copied");
    setTimeout(() => {
      setCopyLabel("Copy");
    }, 2000);
  }

  function openShare() {
    navigator.share({
      title: "Share Survey",
      text: "Share this survey with others",
      url: getLink(),
    });
  }

  function claimRewards() {
    if (email === "") {
      setError("Please enter an email address");
      return;
    }
    if (!isEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    let order = newOrder(email, config.completionPayout);
    console.log("Fetching Tremendous order API");

    sendPayment(order, config.id, "referral").then((data) => {
      if (data.statusCode > 201) {
        setError(data.message);
      } else {
        setError("");
      }
      console.log(data);
    });
    setLoading(false);
  }

  return (
    <SurveyTakerStandardPage>
      {loading && <Loading />}
      <div className="flex flex-col items-center">
        <p className="max-w-prose text-left">
          Thank you for taking the time to complete this survey!
          <br />
          <br />
          If you would like to share this survey with others for additional
          rewards, please use the link below.
        </p>
      </div>

      <div className="flex w-4/5 flex-col items-center gap-y-6 lg:w-1/3">
        <ShareBox link={getLink()} />
        <div className="flex w-full flex-row justify-center gap-8">
          <button
            className="w-1/3 rounded bg-rdsOrange p-1 text-white"
            onClick={() => {
              copyToClipboard();
            }}
          >
            {copyLabel}
          </button>
          <button
            className="w-1/3 rounded bg-rdsOrange p-1 text-white"
            onClick={() => openShare()}
          >
            Share
          </button>
        </div>
      </div>
      <p className="max-w-prose text-justify">
        To claim your rewards for referrals, enter your email and press the
        "Claim Rewards" button. You will receive an email to claim your rewards
        from Tremendous. We do not store your email address.
      </p>
      <div className="flex w-4/5 flex-col items-center gap-y-6 lg:w-1/3">
        <div className="flex flex-col">
          <label htmlFor="email">Email Address: </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-56 justify-self-center rounded bg-gray-200 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-1/2 rounded bg-rdsOrange p-1 text-white md:w-1/3"
          onClick={() => claimRewards()}
        >
          Claim Rewards
        </button>
        <p className="text-red-600">{error}</p>
      </div>
    </SurveyTakerStandardPage>
  );
}
