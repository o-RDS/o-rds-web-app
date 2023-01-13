import React from "react";
import { Link } from "react-router-dom";
import helpIcon from '../images/help_icon.png';

export default function TopNav() {
    return (
        <div className="flex flex-row border-b-4 w-screen justify-start h-14 items-center px-2">
            <h3 className="text-lg bg-gradient-to-br from-emerald-700 to-orange-600 inline-block text-transparent bg-clip-text justify-start items-center">o-RDS</h3>
            <div className="flex items-center gap-2 ml-auto">
                {/* <p>Home</p> */}
                <Link to="/DashboardAdmin">
                    <button className="hover:border-b-2 hover:translate transform-y-1/2">Home</button>
                </Link>
                <Link to="/PaymentManagerAdmin">
                    <button>Payments</button>
                </Link>
                <img src={helpIcon} className="w-6 h-6" />
                {/* <p>Profile</p> */}
                <div className="w-8 h-8 bg-lime-500 rounded-2xl"></div>
            </div>
        </div>
    );
}