import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StandardPage from "../../components/StandardPage";
import { register } from "../../APIs/Admin.auth.js";

export default function RegisterAdmin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  async function handleRegister(e: any) {
    e.preventDefault();
    let data: any = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());

    try {
      //Sanitize the user's input?

      //Verify that all fields have been filled
      Object.entries(formObject).forEach(([key, value]: Array<string>) => {
        if (value === "") {
          setErrorMessage({
            error: true,
            message: "All fields are required and must be filled out.",
          });
          throw new Error("Missing fields");
        }
      });

      //Verify that the email is valid
      let regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      let emailVerified = regexp.test(formObject.email);
      if (!emailVerified) {
        setErrorMessage({
          error: true,
          message: "Please enter a valid email address.",
        });
        throw new Error("Invalid email");
      }

      //Verify that the two passwords match
      if (formObject.password !== formObject.confirmPassword) {
        setErrorMessage({
          error: true,
          message:
            "The passwords do not match. Please enter your password again.",
        });
        throw  new Error("Password mismatch");
      }
    } catch (error) {
      console.error(error);
      return; //Return to prevent erroneous data from being sent to server
    }

    let accountInfo = {
      fullname: formObject.name,
      email: formObject.email,
      role: formObject.role,
      password: formObject.password,
    };

    try {
      let registerResponse = await register(accountInfo);
      console.log(registerResponse);
      setErrorMessage({ error: false, message: "" });
      setRegisterSuccess(true);
      setTimeout(() => navigate("/admin/login"), 3000);
    } catch (error: any) {
      console.error(error);
      if (error.message === "Conflict") {
        setErrorMessage({
          error: true,
          message: "An account with that email already exists.",
        });
      } else {
        setErrorMessage({
          error: true,
          message: "An error occurred while creating your account.",
        });
      }
    }
  }

  return (
    <StandardPage>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1 className="inline-block bg-gradient-to-br from-green-600 to-orange-600 bg-clip-text text-3xl text-transparent">
          Register for o-RDS
        </h1>
        <form
          className="flex w-1/6 flex-col items-center justify-center"
          onSubmit={(e) => handleRegister(e)}
        >
          <div className="relative w-full">
            <input
              type="text"
              id="name"
              name="name"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              required
            />
            <label
              htmlFor="name"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Full Name
            </label>
          </div>
          <br />
          <div className="relative w-full">
            <input
              type="text"
              id="email"
              name="email"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              required
            />
            <label
              htmlFor="email"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Email Address
            </label>
          </div>
          <br />
          <div className="relative w-full">
            <input
              type="password"
              id="password"
              name="password"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              required
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Password
            </label>
          </div>
          <br />
          <div className="relative w-full">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Confirm Password
            </label>
          </div>
          <br />
          <div className="relative w-full">
            <select
              id="role"
              name="role"
              className="peer block w-full  rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-rdsDark2 dark:text-white dark:focus:border-rdsBlue"
            >
              <option value="admin">Admin</option>
              <option value="ra">Research Assistant</option>
            </select>
            <label
              htmlFor="role"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Role
            </label>
          </div>
          <br />
          <button className="w-1/2 rounded bg-rdsOrange p-1 text-white">
            Create Account
          </button>
          <br />
          {errorMessage.error && (
            <div className="w-full rounded-md bg-red-500 bg-opacity-20 p-2">
              <p className="text-center text-sm text-red-500">
                {errorMessage.message}
              </p>
            </div>
          )}
          {registerSuccess && (
            <div className="w-full rounded-md bg-green-500 bg-opacity-20 p-2">
              <p className="text-center text-sm text-green-500">
                Your account was registered successfully! You will now be
                redirected to the Login page.
              </p>
            </div>
          )}
        </form>
        <button
          onClick={() => navigate("/admin/login")}
          className="text-rdsOrange underline"
        >
          Already have an account? Login instead!
        </button>
      </div>
    </StandardPage>
  );
}
