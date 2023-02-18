import React from "react";
import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";

export default function LoginAdmin() {

  function handleLogin(e: any) {
    var data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
  }

  return (
    <StandardPage>
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="inline-block bg-gradient-to-br from-green-600 to-orange-600 bg-clip-text text-3xl text-transparent">
          Welcome to o-RDS
        </h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="relative">
          <input type="text" id="username" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Floating filled</label>
          </div>
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
          <input type="submit" className="w-56 rounded bg-orange-600 p-1 text-white" >
            Login
          </input>
        </form>
      </div>
    </StandardPage>
  );
}
