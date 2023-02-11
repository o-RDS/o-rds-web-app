import React from "react";

export function MoneySettings() {
    return (
        <div>
            <h3 className="text-xl">Referrals & Payments</h3>
            <div className="flex flex-col">
              <label htmlFor="num-referrals">Number of Referrals - Paid</label>
              <input id="num-referrals" className="w-2/5"></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="referrals-max">Referrals - Max</label>
              <input id="referrals-max" className="w-2/5"></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="completion-amount">Completion Amount</label>
              <input id="completion-amount" className="w-2/5"></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="referral-amount">Referral Amount</label>
              <input id="referral-amount" className="w-2/5"></input>
            </div>
          </div>
    )
}