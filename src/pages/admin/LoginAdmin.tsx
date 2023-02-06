import React from "react";
import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";

export default function LoginAdmin() {
  return (
    <StandardPage>
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="inline-block bg-gradient-to-br from-green-600 to-orange-600 bg-clip-text text-3xl text-transparent">
          Welcome to o-RDS
        </h1>
        <input
          type="text"
          placeholder="username"
          className="w-56 rounded bg-gray-200 p-1"
        ></input>
        <input
          type="text"
          placeholder="password"
          className="w-56 rounded bg-gray-200 p-1"
        ></input>
        <br></br>
        <Link to="/admin/dashboard">
          {" "}
          {/*to="../dashboard">*/}
          <button className=" w-56 rounded bg-orange-600 p-1 text-white">
            Login
          </button>
        </Link>
      </div>
    </StandardPage>
  );
}
