import React, { useReducer } from "react";

export default function Signup(props) {
  const [signup, dispatch] = useReducer((state, action) => {
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
  const { success, error, email, password, isLoading } = signup;
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (signup.country === undefined) signup.country = "Nigeria";
          console.log(signup);
        }}
      >
        <p>Signup oo</p>
        <input
          type="text"
          name="fullname"
          placeholder="Fullname"
          onChange={(event) => {
            event.persist();
            dispatch({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={(event) => {
            event.persist();
            dispatch({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(event) => {
            event.persist();
            dispatch({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          onChange={(event) => {
            event.persist();
            dispatch({ type: "GET_INPUT", payload: event });
          }}
        ></input>
        <select
          name="country"
          onChange={(event) => {
            event.persist();
            dispatch({ type: "GET_INPUT", payload: event });
          }}
        >
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
          <option value="UK">UK</option>
        </select>
        <button type="submit"> SIGNUP</button>
      </form>
    </div>
    // ya doing well thanksssss, can we take a break?
    // okayyy, push the code tho alrightttt
  );
}
