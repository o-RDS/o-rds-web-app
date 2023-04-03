import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import tremendousLogo from "../../images/tremendous_logo.svg";
import { order } from "../../APIs/interfaces";
import { sendPayment } from "../../APIs/Tremendous";

export function isEmail(email: string) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function newOrder(email: string, payment: number): order {
  let order: order = {
    funding_source_id: "0JLPRGW2MEB9",
    campaign_id: "4BDWAVSR8A91",
    products: ["TBAJH7YLFVS5"],
    denomination: payment,
    recipient_name: "Survey Taker", // To keep anonymous
    recipient_email: email,
    delivery_method: "EMAIL",
  };
  return order;
}

export default function ReceivePayment() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const config: any = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (config !== null || config !== undefined) {
      if (config.completionPayout === 0) {
        navigate("../share");
      }
    }
  }, [config, navigate]);

  function sendReward() {
    let order = newOrder(email, config.completionPayout);
    console.log("Fetching Tremendous order API");

    sendPayment(order, config.id, "complete").then((data) => {
      if (data.statusCode > 201) {
        setError(data.message);
      } else {
        setEmailVerified(true);
      }
      console.log(data);
    });
  }

  return (
    <SurveyTakerStandardPage>
      <div className="flex max-w-prose flex-col">
        <p>
          Thank you for completing the survey! You may now claim your
          participation reward of ${config.completionPayout.toFixed(2)}! Your
          reward will be sent to you through Tremendous, a digital payment
          service.
          <br />
          <br />
          Please enter your email address below, and you will be sent an email
          from Tremendous with instructions on how to claim your reward.
        </p>
      </div>

      {emailVerified ? (
        <div className="mt-6 flex w-full max-w-prose flex-col items-center">
          <img
            src={tremendousLogo}
            alt="The logo of Tremendous"
            className="w-3/4"
          />
          <div className="mt-6 flex w-2/3 max-w-prose flex-row items-center justify-center gap-x-2">
            <p className=" text-center text-6xl text-green-500">✔</p>
            <p className="max-w-xs break-words pl-2 text-center">
              An email will be sent to <br />
              {email}!
            </p>
          </div>
          <Link
            to="../share"
            className="mt-6 w-1/3 rounded bg-orange-600 p-1 text-center text-white"
          >
            <button>Continue</button>
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex w-full max-w-prose flex-col items-center">
          <img
            src={tremendousLogo}
            alt="The logo of Tremendous"
            className="w-3/4"
          />
          <label htmlFor="tremendousEmail" className="mt-6 w-2/3">
            Email:
            <br />
          </label>
          <input
            type="text"
            id="tremendousEmail"
            name="tremendousEmail"
            className="w-2/3 rounded bg-gray-200 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={() => {
              setError("");
              if (isEmail(email)) {
                sendReward();
              } else {
                setError("Invalid email");
              }
            }}
            className="mt-6 w-1/3 rounded bg-orange-600 p-1 text-white"
          >
            Submit
          </button>
          <p className="mt-6 text-red-500">{error}</p>
        </div>
      )}
    </SurveyTakerStandardPage>
  );
}
