import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import StandardPage from "../../components/StandardPage";
import {login} from "../../APIs/Admin.auth.js";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({error: false, message: ""});
  async function handleLogin(e: any) {
    e.preventDefault();
    let loginResponse: any = "";
    var data: any = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    let loginInfo = {
      email: formObject.username,
      password: formObject.password
    }
    try {
      loginResponse = await login(loginInfo);
      document.cookie = `token=${loginResponse.accessToken}`
      navigate("admin/dashboard");
    } catch (error) {
      setErrorMessage({error: true, message: "Username or password was incorrect"});
      console.log(error);
    } 
  }

  return (
    <StandardPage>
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 dark:bg-rdsDark2">
        <h1 className="inline-block bg-gradient-to-br from-green-600 to-orange-600 bg-clip-text text-3xl text-transparent">
          Welcome to o-RDS
        </h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Username
            </label>
          </div>
          <br></br>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Password
            </label>
          </div>
          <br></br>
          <button className="w-full rounded bg-orange-600 p-1 text-white">
            Submit
          </button>
          <br></br>
          <br></br>
          {errorMessage.error && <div className="p-2 w-full bg-red-500 bg-opacity-20 rounded-md"><p className="text-red-500 text-center text-sm">{errorMessage.message}</p></div>}
        </form>
        <br/>
        <button
          onClick={() => navigate("../register")}
          className="text-rdsOrange underline"
        >
          Need an account? Click here to register!
        </button>
      </div>
    </StandardPage>
  );
}
