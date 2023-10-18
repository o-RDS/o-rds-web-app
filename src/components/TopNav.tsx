import React from "react";
import { Link, useNavigate } from "react-router-dom";
import helpIcon from "../images/help_icon.png";
import { deleteCookie } from "../data/cookieFunctions";

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="flex h-14 w-full flex-row items-center justify-start overflow-visible overflow-y-auto border-b-[1px] border-black px-4">
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
        {/* <img src={helpIcon} className="h-6 w-6" alt="Help Icon" /> */}
        <button
          className="rounded-sm bg-rdsOrange px-2 py-1 text-white transition-all hover:bg-rdsOrange/80 hover:border-rdsOrange/80 active:translate-y-1 active:shadow-none"
          onClick={() => {
            deleteCookie("token");
            navigate("/admin/login");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
