import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateUser } from "../../redux/authentication/auth-actions";
import { authReset, selectAuth } from "../../redux/authentication/auth-slice";
import { Alert } from "../../components";
import waves from "../../assets/images/waves.svg"
import loginImg from "../../assets/images/loginImg.jpg"


export default function Signup(props) {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [signup, dispatchInputEvent] = useReducer((state, action) => {
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
  }, {});
  return (
    <div className="relative h-screen w-full sssss">
      <div className="hidden sm:block w-1/2 h-full">
        <div className="h-full bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${loginImg})` }}></div>
      </div>
      <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-white h-full" >
        <div className="p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
          <div className="w-full absolute custom-shape-divider-top-1609595750">
            <img className="transform rotate-90" src={waves} alt={waves} />
          </div>

          <div className="py-8">
            <h2 className="text-4xl">SignUp</h2>
            <p className="text-gray-500 py-1">Create an account to continue</p>
          </div>
          <form
            className="flex flex-col justify-center items-center w-5/6"
            onSubmit={(event) => {
              event.preventDefault();
              if (signup.country === undefined) signup.country = "Nigeria";
              dispatch(authenticateUser(signup, ""));
            }}
          >
            <p>{auth.isLoading && "Please wait"}</p>
            {auth.error && (
              <Alert label={auth.message} callback={() => dispatch(authReset())} />
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
            <select
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
            </select>
            <button
              className="w-24 bg-green-400 p-2 my-3 rounded-full text-white"
              type="submit">
              SIGNUP
            </button>
            <p className="text-gray-500 my-3">
              Already have an account?
          <Link to="/login" replace={true} className="text-green-400 underline pl-0.5">
                Login
          </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
