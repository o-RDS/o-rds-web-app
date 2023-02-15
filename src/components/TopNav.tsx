import React from "react";
import { Link } from "react-router-dom";
import helpIcon from "../images/help_icon.png";

export default function TopNav() {
  return (
    <div className="flex h-14 w-screen flex-row items-center justify-start border-b-4 px-2">
      <h3 className="inline-block items-center justify-start bg-gradient-to-br from-rdsBlue to-rdsOrange bg-clip-text text-lg text-transparent">
        o-RDS
      </h3>
      <div className="ml-auto flex items-center gap-2">
        {/* <p>Home</p> */}
        <Link to="/admin/dashboard/">
          <button className="hover:translate transform-y-1/2 hover:border-b-2">
            Home
          </button>
        </Link>
        <Link to="/admin/payment-manager/">
          <button>Payments</button>
        </Link>
        <img src={helpIcon} className="h-6 w-6" alt="Help Icon" />
        {/* <p>Profile</p> */}
        <div className="h-8 w-8 rounded-2xl bg-lime-500"></div>
      </div>
    </div>
  );
}
