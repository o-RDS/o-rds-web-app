import React, { useState } from "react";
import { Link } from "react-router-dom";
import helpIcon from "../images/help_icon.png";
import ords from "../images/ords.png";

export default function SurveyTopNav(props: any) {
  return (
    <div className="flex h-14 w-screen flex-row items-center justify-start px-2 shadow-sm shadow-black overflow-visible overflow-y-auto">
      <div className="flex flex-row gap-3">
        <img src={ords} className="w-14 h-14" alt="o-RDS Logo"></img>
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
