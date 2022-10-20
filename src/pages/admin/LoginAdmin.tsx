import React from "react";
import { Link } from "react-router-dom";

export default function LoginAdmin() {
    return (
        <>
        <div>
            <h3 className="text-lg bg-gradient-to-br from-emerald-700 to-orange-600 inline-block text-transparent bg-clip-text">o-RDS</h3>
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen gap-2">
            <h1 className="text-3xl bg-gradient-to-br from-green-600 to-orange-600 inline-block text-transparent bg-clip-text">Welcome to o-RDS</h1>
            <input type="text" placeholder="username" className="w-56 p-1 rounded bg-gray-200"></input>
            <input type="text" placeholder="password" className="w-56 p-1 rounded bg-gray-200"></input>
            <br></br>
            <Link to="/DashboardAdmin">
                <button className=" p-1 w-56 rounded bg-orange-600 text-white">Login</button>
            </Link>
            {/* <Link to="/DashboardAdmin">
                <button className=" p-1 w-56 rounded border-2 border-orange-500 text-orange-500">Sign Up</button>
            </Link> */}
        </div>
        </>
    )
}