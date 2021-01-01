import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../../components";
import { resetPassword } from "../../redux/authentication/auth-actions";
import { authReset, selectAuth } from "../../redux/authentication/auth-slice";

export default function ResetPassword(props) {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
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
          dispatch(resetPassword(email));
        }}
      >
        <p>RESET YOUR PASSWORD</p>
        <p>{auth.isLoading && "Please wait"}</p>
        {auth.error && (
          <Alert label={auth.message} callback={() => dispatch(authReset())} />
        )}
        {auth.message && <small>{auth.message}</small>}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={(event) => {
            event.persist();
            setEmail(event.target.value);
          }}
        ></input>
        <button type="submit"> RESET PASSWORD</button>
      </form>
    </div>
  );
}
