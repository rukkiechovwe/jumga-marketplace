import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateUser } from "../../redux/authentication/auth-actions";
import { authReset, selectAuth } from "../../redux/authentication/auth-slice";
import { Alert } from "../../components";

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
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (signup.country === undefined) signup.country = "Nigeria";
          dispatch(authenticateUser(signup, ""));
        }}
      >
        <p>SIGNUP</p>
        <p>{auth.isLoading && "Please wait"}</p>
        {auth.error && (
          <Alert label={auth.message} callback={() => dispatch(authReset())} />
        )}
        <input
          type="text"
          name="fullname"
          placeholder="Fullname"
          onChange={(event) => {
            event.persist();
            dispatchInputEvent({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={(event) => {
            event.persist();
            dispatchInputEvent({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(event) => {
            event.persist();
            dispatchInputEvent({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(event) => {
            event.persist();
            dispatchInputEvent({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <select
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
        <button type="submit"> SIGNUP</button>
        <small>
          Already have an account?
          <Link to="/login" replace={true}>
            Login
          </Link>
        </small>
      </form>
    </div>
  );
}
