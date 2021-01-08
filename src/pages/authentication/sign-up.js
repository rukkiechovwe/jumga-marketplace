import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateUser } from "../../redux/authentication/auth-actions";
import { authReset, selectAuth } from "../../redux/authentication/auth-slice";
import { Alert } from "../../components";
import loginImg from "../../assets/images/loginImg.jpg";
import validateForm from "../../helpers/validators";

export default function Signup() {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [signup, dispatchInputEvent] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "INIT":
          return { ...state, error: null, isLoading: true };
        case "DONE":
          return { ...state, success: true };
        case "GET_INPUT":
          const event = action.payload;
          const { name, value } = event.target;
          return { ...state, [name]: value };
        case "ERROR":
          return { ...state, error: action.payload, isLoading: false };
        default:
          throw new Error("No actionType");
      }
    },
    { country: "NG" }
  );
  const { country } = signup;
  return (
    <div className="relative h-screen w-full sssss">
      <div className="hidden sm:block w-1/2 h-full">
        <div
          className="h-full bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${loginImg})` }}
        ></div>
      </div>
      <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-white h-full">
        <div className="p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
          <div className="py-8">
            <h2 className="text-4xl">SignUp</h2>
            <p className="text-gray-500 py-1">Create an account to continue</p>
          </div>
          <form
            className="flex flex-col justify-center items-center w-5/6"
            onSubmit={(event) => {
              event.preventDefault();
              if (validateForm({ name: 'fullName', value: signup.fullName })) {
                if (validateForm({ name: 'email', value: signup.email })) {
                  if (validateForm({ name: 'password', value: signup.password })) {
                    if (signup.confirmPassword === signup.password) {
                      dispatch(authenticateUser(signup, ""));
                    }
                    else {
                      setError("Invalid password, Could not confirm password")
                    }
                  } else {
                    setError("Invalid password, Password should be greater than 5 characters")
                  }
                } else {
                  setError("Invalid email address")
                }
              }
              else {
                setError("Invalid name")
              }

            }}
          >
            <p>{auth.isLoading && "Please wait"}</p>
            {auth.error && (
              <Alert
                label={auth.message}
                callback={() => dispatch(authReset())}
              />
            )}
            <p>{error && error}</p>
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="text"
              name="fullname"
              placeholder="Fullname"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            ></input>
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            ></input>
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            ></input>

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
            <div class="mt-2">
              <span class="text-gray-700">Select Country</span>
              <div class="mt-2">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="country"
                    onChange={(event) => {
                      event.persist();
                      dispatchInputEvent({ type: "GET_INPUT", payload: event });
                    }}
                    value="NG"
                    checked={country === "NG"}
                  />
                  <span class="ml-2">Nigeria</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    class="form-radio"
                    name="country"
                    value="GH"
                    checked={country === "GH"}
                    onChange={(event) => {
                      event.persist();
                      dispatchInputEvent({ type: "GET_INPUT", payload: event });
                    }}
                  />
                  <span class="ml-2">Ghana</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    class="form-radio"
                    name="country"
                    value="KE"
                    checked={country === "KE"}
                    onChange={(event) => {
                      event.persist();
                      dispatchInputEvent({ type: "GET_INPUT", payload: event });
                    }}
                  />
                  <span class="ml-2">Kenya</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    class="form-radio"
                    name="country"
                    value="UK"
                    checked={country === "UK"}
                    onChange={(event) => {
                      event.persist();
                      dispatchInputEvent({ type: "GET_INPUT", payload: event });
                    }}
                  />
                  <span class="ml-2">UK</span>
                </label>
              </div>
            </div>
            {/* <select
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3"
              name="country"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            >
              <option value="NG">Nigeria</option>
              <option value="GH">Ghana</option>
              <option value="KE">Kenya</option>
              <option value="UK">UK</option>
            </select> */}
            <div class="flex mt-6">
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox" />
                <span class="ml-2 text-sm">
                  I agree to the{" "}
                  <span class="underline cursor-pointer">privacy policy</span>
                </span>
              </label>
            </div>
            <button
              className="w-24 bg-green-400 p-2 my-3 rounded-full text-white"
              type="submit"
            >
              SIGNUP
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
