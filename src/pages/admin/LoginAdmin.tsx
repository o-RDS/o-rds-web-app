import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StandardPage from "../../components/StandardPage";
import Error from "../../components/Error";
import { login } from "../../APIs/Admin.auth.js";
import { setCookie } from "../../data/cookieFunctions";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    let loginResponse: any = "";
    console.log(e);
    console.log(e.target);
    var data: any = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    console.log(formObject);

    try {
      //Verify that all fields have been filled
      Object.entries(formObject).forEach(([key, value]: Array<string>) => {
        if (value === "") {
          setErrorMessage("All fields are required and must be filled out.");
          throw Error("Missing fields");
        }
      });
    } catch (error) {
      console.error(error);
      return; //Return to prevent erroneous data from being sent to server
    }

    let loginInfo = {
      email: formObject.email,
      password: formObject.password,
    };

    try {
      loginResponse = await login(loginInfo);
      if (loginResponse.statusCode > 201) {
        setErrorMessage(data.message);
        return;
      }
      if (loginResponse === undefined || loginResponse.statusCode === 500) {
        throw Error("Server error");
      } else if (loginResponse.statusCode === 404) {
        setErrorMessage("Username or password was incorrect");
      } else {
        setCookie("token", loginResponse.accessToken, 1);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setErrorMessage("Server error, please try again later");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-rdsDark2 dark:text-white">
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 dark:bg-rdsDark2">
        <h1 className="inline-block bg-clip-text text-4xl text-rdsBlue">
          Welcome to o-RDS
        </h1>
        <form
          className="flex w-1/6 flex-col items-center justify-center"
          onSubmit={(e) => handleLogin(e)}
        >
          <div className="relative w-full">
            <input
              type="text"
              id="email"
              name="email"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              placeholder=""
              required
            />
            <label
              htmlFor="email"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:font-bold peer-focus:text-rdsOrange dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Email Address
            </label>
          </div>
          <br></br>
          <div className="relative w-full">
            <input
              type="password"
              id="password"
              name="password"
              className="peer block w-full appearance-none rounded-lg border border-black bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rdsBlue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-rdsBlue"
              placeholder=""
              required
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:font-bold peer-focus:text-rdsOrange dark:bg-rdsDark2 dark:text-gray-400 peer-focus:dark:text-rdsOrange"
            >
              Password
            </label>
          </div>
          <br></br>
          <button className="w-1/2 rounded bg-rdsOrange p-1 text-white transition-all hover:shadow-blur hover:shadow-black active:translate-y-1 active:shadow-none">
            Login
          </button>
          <br></br>
          <br></br>
          {errorMessage && <Error message={errorMessage} />}
        </form>

        {/* <button
          onClick={() => navigate("/admin/register")}
          className="text-rdsOrange underline"
        >
          Need an account? Click here to register!
        </button> */}
      </div>
    </div>
  );
}
