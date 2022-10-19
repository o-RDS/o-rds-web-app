import React from "react";

export default function LoginAdmin() {
    return (
        <div className="flex flex-col justify-items-center align-content-center h-screen">
            <h1 className="text-3xl font-bold underline">Welcome to o-RDS</h1>
            <input className="border-4 rounded border-black"></input>
            <input className="border-4 rounded border-black"></input>
            <button className="rounded">Login</button>
            <button className="rounded">Sign Up</button>
        </div>
    )
}