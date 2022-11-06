import React from "react";

export default function TopNav() {
    return (
        <div className="flex flex-row border-b-4 w-screen justify-end">
            <h3 className="text-lg bg-gradient-to-br from-emerald-700 to-orange-600 inline-block text-transparent bg-clip-text justify-self-start">o-RDS</h3>
            <div className="flex justify-self-end items-center gap-2">
                <p>Home</p>
                <p>Payments</p>
                <p>Help</p>
                <p>Profile</p>
            </div>
        </div>
    );
}