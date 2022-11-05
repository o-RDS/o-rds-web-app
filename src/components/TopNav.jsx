import React from "react";

export default function TopNav() {
    return (
        <div className="flex flex-row border-b-4">
            <div>
                <h3 className="text-lg bg-gradient-to-br from-emerald-700 to-orange-600 inline-block text-transparent bg-clip-text">o-RDS</h3>
            </div>
            <p>Home</p>
            <p>Payments</p>
            <p>Help</p>
            <p>Profile</p>
        </div>
    );
}