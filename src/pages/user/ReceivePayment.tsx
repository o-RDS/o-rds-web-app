import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import tremendousLogo from "../../images/tremendous_logo.svg";
import { order } from "../../APIs/interfaces";
import { sendPayment } from "../../APIs/Tremendous";
import { send } from "process";

export default function ReceivePayment() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [completionPayout, setCompletionPayout] = useState(0);
  const config: any = useOutletContext();

  function newOrder(
    email: string,
    phoneNum: string,
    hash: string,
    payment: number
  ): order {
    let order: order = {
      external_id: hash,
      funding_source_id: "0JLPRGW2MEB9",
      campaign_id: "4BDWAVSR8A91",
      products: ["TBAJH7YLFVS5"],
      denomination: payment, 
      recipient_name: "Survey Taker", // To keep anonymous
      recipient_email: email,
      recipient_phone: phoneNum,
      reward_id: "123456",
      reward_value: "Survey Reward",
      delivery_method: "EMAIL",
    };

    return order;
  }

  function sendReward() {
    let email = (document.getElementById("tremendousEmail") as HTMLInputElement)
      .value;
    let phone = window.sessionStorage.getItem("phone");
    let hash = window.sessionStorage.getItem("hash");
    if (phone && hash != null) {
      setCompletionPayout(config.completionPayout);
      let order = newOrder(email, phone, hash, completionPayout);

      // DEV: Tremendous requires payout to be > 1
      if (order.denomination == 0) {
        order.denomination = 1;
      } else {
        let order = newOrder(email, phone, hash, completionPayout + 1);
      }

      console.log("Fetching Tremendous order API");
      
      sendPayment(order).then((data) => {
        console.log(data);
      });
    }
  }

  return (
    <SurveyTakerStandardPage>
      <div className="mt-10 flex max-w-prose flex-col">
        <p>
          Thank you for completing the survey! You may now claim your
          participation reward of $X! Your reward will be sent to you through
          Tremendous, a digital payment service.
          <br />
          <br />
          Please enter your email address below, and you will be sent an email
          from Tremendous with instructions on how to claim your reward.
        </p>
      </div>

      {emailVerified ? (
        <div className="mt-12 flex w-full max-w-prose flex-col items-center">
          <img
            src={tremendousLogo}
            alt="The logo of Tremendous"
            className="w-3/4"
          />
          <div className="mt-6 flex w-2/3 max-w-prose flex-row items-center justify-center">
            <p className="w-1/6 text-center text-6xl text-green-500">✔</p>
            <p className="w-5/6 max-w-xs break-words pl-2 text-center">
              An email will be sent to <br />{" "}
              {
                (document.getElementById("tremendousEmail") as HTMLInputElement)
                  .value
              }
              !
            </p>
          </div>
          <button className="mt-6 w-1/3 rounded bg-orange-600 p-1 text-white">
            Continue
          </button>
        </div>
      ) : (
        <div className="mt-12 flex w-full max-w-prose flex-col items-center">
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
            placeholder="Ex: name@gmail.com"
            className="w-2/3 rounded bg-gray-200 p-1"
          ></input>
          <button
            onClick={() => {
              let email = (
                document.getElementById("tremendousEmail") as HTMLInputElement
              ).value;
              let regexp = new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
              let test = regexp.test(email);
              if (test) {
                setEmailVerified(true);
                sendReward();
              } else {
                alert("Invalid email");
              }
            }}
            className="mt-6 w-1/3 rounded bg-orange-600 p-1 text-white"
          >
            Submit
          </button>
        </div>
      )}
    </SurveyTakerStandardPage>
  );
}
