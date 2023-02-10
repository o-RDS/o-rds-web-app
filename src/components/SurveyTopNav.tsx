import React, { useState } from "react";
import { Link } from "react-router-dom";
import helpIcon from "../images/help_icon.png";

export default function SurveyTopNav(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-14 w-screen flex-row items-center justify-start px-2 shadow-sm shadow-black">
      <div className="flex flex-row gap-3">
        <h3 className="inline-block items-center justify-start bg-gradient-to-br from-rdsBlue to-rdsOrange bg-clip-text text-lg text-transparent">
          o-RDS
        </h3>
        <div className="">
          <h3 onClick={() => setOpen(!open)}>{props.name}</h3>
          {open && (
            <div className="flex flex-col">
              <Link to="../results">Results</Link>
              <Link to="../survey-builder">Survey Builder</Link>
            </div>
          )}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Link to="../dashboard">
          <button className="hover:translate transform-y-1/2 hover:border-b-2">
            Home
          </button>
        </Link>
        <Link to="../payment-manager">
          <button>Payments</button>
        </Link>
        <img src={helpIcon} className="h-6 w-6" alt="Help Icon" />
        <div className="h-8 w-8 rounded-2xl bg-lime-500"></div>
      </div>
    </div>
  );
}
