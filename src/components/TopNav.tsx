import React from "react";
import { Link, useNavigate } from "react-router-dom";
import helpIcon from "../images/help_icon.png";
import {deleteCookie} from "../data/cookieFunctions"

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="flex h-14 w-full flex-row items-center justify-start overflow-visible overflow-y-auto px-2 shadow-sm shadow-black">
      <Link to="/admin/dashboard/">
        <h3 className="inline-block items-center justify-start bg-gradient-to-br from-rdsBlue to-rdsOrange bg-clip-text text-lg text-transparent">
          o-RDS
        </h3>
      </Link>
      <div className="ml-auto flex items-center gap-2">
        {/* <p>Home</p> */}
        {/* <Link to="/admin/dashboard/">
          <button className="hover:translate transform-y-1/2 hover:border-b-2">
            Home
          </button>
        </Link> */}
        <img src={helpIcon} className="h-6 w-6" alt="Help Icon" />
        <button
          className="hover:shadow-black hover:shadow-md bg-rdsOrange rounded-sm p-1 transition-all"
          onClick={() => {
            deleteCookie("token");
            navigate("/admin/login")
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
