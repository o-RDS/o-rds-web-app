import React from "react";

export default function TopNav() {
    return (
        <div className="flex flex-row border-b-4 w-screen justify-start h-10 items-center px-2">
            <h3 className="text-lg bg-gradient-to-br from-emerald-700 to-orange-600 inline-block text-transparent bg-clip-text justify-start items-center">o-RDS</h3>
            <div className="flex items-center gap-2 ml-auto">
                <p>Home</p>
                <p>Payments</p>
                <p>Help</p>
                <p>Profile</p>
            </div>
        </div>
    );
}