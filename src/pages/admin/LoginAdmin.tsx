import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StandardPage from "../../components/StandardPage";

export default function LoginAdmin() {

  function handleLogin(e: any) {
    var data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
  }

  return (
    <StandardPage>
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 dark:bg-rdsDark2">
        <h1 className="inline-block bg-gradient-to-br from-green-600 to-orange-600 bg-clip-text text-3xl text-transparent">
          Welcome to o-RDS
        </h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="relative">
          <input type="text" id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-rdsBlue focus:outline-none focus:ring-0 focus:border-rdsBlue peer" placeholder=" " />
          <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-rdsDark2 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-rdsOrange peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Username</label>
          </div>
          <br></br>
          <div className="relative">
          <input type="text" id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-rdsBlue focus:outline-none focus:ring-0 focus:border-rdsBlue peer" placeholder=" " />
          <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-rdsDark2 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-rdsOrange peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
          </div>
        <br></br>
          <input type="submit" className="w-56 rounded bg-orange-600 p-1 text-white" >
          </input>
        </form>
      </div>
    </StandardPage>
  );
}
