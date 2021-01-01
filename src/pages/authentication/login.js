import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "../../components";
import { authenticateUser } from "../../redux/authentication/auth-actions";
import { authReset, selectAuth } from "../../redux/authentication/auth-slice";

export default function Login(props) {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [login, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case "INIT":
        return { ...state, error: null, isLoading: true };
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
          dispatch(authenticateUser(login, "login"));
        }}
      >
        <p>LOGIN</p>
        <p>{auth.isLoading && "Please wait"}</p>
        {auth.error && (
          <Alert label={auth.message} callback={() => dispatch(authReset())} />
        )}
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
        <button type="submit"> LOGIN</button>
        <small>
          Don't have an account?
          <Link to="/sign-up" replace={true}>
            Signup here
          </Link>
        </small>
        <small>
          <Link to="/reset-password">Forgot password?</Link>
        </small>
      </form>
    </div>
  );
}
