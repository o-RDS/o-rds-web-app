import React from "react";

export function MoneySettings() {
    return (
        <div className="flex flex-col gap-10 w-full pl-2 pr-2">
            <h3 className="text-3xl">Referrals & Payments</h3>
            <div className="flex flex-col gap-1">
              <label htmlFor="num-referrals">Number of Referrals - Paid</label>
              <input id="num-referrals" className="w-2/5 rounded-sm dark:bg-rdsDarkAccent p-1" maxLength={20}></input>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="referrals-max">Referrals - Max</label>
              <input id="referrals-max" className="w-2/5 rounded-sm dark:bg-rdsDarkAccent p-1"></input>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="completion-amount">Completion Amount</label>
              <input id="completion-amount" className="w-2/5 rounded-sm dark:bg-rdsDarkAccent p-1"></input>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="referral-amount">Referral Amount</label>
              <input id="referral-amount" className="w-2/5 rounded-sm dark:bg-rdsDarkAccent p-1"></input>
            </div>
          </div>
    )
}