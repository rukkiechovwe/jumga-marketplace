import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateUser } from "../../redux/authentication/auth-actions";
import { authReset, selectAuth } from "../../redux/authentication/auth-slice";
import { Alert, InputError } from "../../components";
import loginImg from "../../assets/images/loginImg.jpg";
import { validateSignUpForm } from "../../helpers";
import "../../bg-color.css";

export default function Signup() {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [signup, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case "GET_INPUT":
        const event = action.payload;
        const { name, value } = event.target;
        return { ...state, [name]: value };
      default:
    }
  }, {});

  return (
    <div className="relative h-screen w-full sssss">
      <div className="hidden sm:block w-1/2 h-full">
        <div
          className="h-full bg-no-repeat bg-right bg-cover bg-img"
          style={{ backgroundImage: `url(${loginImg})` }}
        ></div>
      </div>
      <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-white h-full">
        <div className="p-0 sm:p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
          <div className="py-8">
            <h2 className="text-4xl">SignUp</h2>
            <p className="text-gray-500 py-1">Create an account to continue</p>
          </div>
          <form
            className="flex flex-col justify-center items-center w-5/6"
            onSubmit={(event) => {
              event.preventDefault();
              const errors = validateSignUpForm(signup);
              if (errors.atLeastAnError) {
                setError(errors);
              } else {
                setError({});
                if (hasAgreedToTerms)
                  dispatch(authenticateUser(signup, "signup"));
              }
            }}
          >
            {auth.message && (
              <Alert
                label={auth.message}
                callback={() => dispatch(authReset())}
              />
            )}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="text"
              name="fullname"
              placeholder="Fullname"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {error.fullname && <InputError message={error.fullname} />}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {error.email && <InputError message={error.email} />}

            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {error.password && <InputError message={error.password} />}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            ></input>
            {error.confirmPassword && (
              <InputError message={error.confirmPassword} />
            )}
            <div class="flex mt-6">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={hasAgreedToTerms}
                  onChange={(e) => {
                    setHasAgreedToTerms(!hasAgreedToTerms);
                  }}
                />
                <span class="ml-2 text-sm">
                  I agree to the{" "}
                  <span className="underline cursor-pointer text-green-400">
                    privacy policy
                  </span>
                </span>
              </label>
            </div>
            <button
              className={`px-4 ${
                hasAgreedToTerms ? `bg-green-400` : `bg-green-300`
              } p-2 my-3 rounded-full text-white focus:outline-none hover:shadow-lg hover:bg-green-300 transition duration-500 ease-in-out`}
              type="submit"
            >
              {auth.isLoading ? "Please wait..." : "SIGNUP"}
            </button>
            <p className="text-gray-500 my-3">
              Already have an account?
              <Link
                to="/login"
                replace={true}
                className="text-green-400 underline pl-0.5"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
