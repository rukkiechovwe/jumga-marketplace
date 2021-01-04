import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../../components";
import { resetPassword } from "../../redux/authentication/auth-actions";
import { authReset, selectAuth } from "../../redux/authentication/auth-slice";
import waves from "../../assets/images/waves.svg"
import loginImg from "../../assets/images/loginImg.jpg"


export default function ResetPassword(props) {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  return (
    <div className="relative h-screen w-full sssss">
      <div className="hidden sm:block w-1/2 h-full">
        <div className="h-full bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${loginImg})` }}></div>
      </div>
      <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-white h-full" >
        <div className="p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
          <div className="w-full absolute custom-shape-divider-top-1609595750">
            <img className="transform rotate-90" src={waves} />
          </div>

          <div className="py-8">
            <h2 className="text-4xl">Reset Your Password</h2>
            <p className="text-gray-500 py-1">Enter your email to continue</p>
          </div>
          <form
            className="flex flex-col justify-center items-center w-5/6"
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(resetPassword(email));
            }}
          >
            <p>{auth.isLoading && "Please wait"}</p>
            {auth.error && (
              <Alert label={auth.message} callback={() => dispatch(authReset())} />
            )}
            {auth.message && <small>{auth.message}</small>}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(event) => {
                event.persist();
                setEmail(event.target.value);
              }}
            ></input>
            <button
              className="w-24 bg-green-400 p-2 my-3 rounded-full text-white focus:outline-none"
              type="submit">
              RESET
        </button>
          </form>
        </div>
      </div>
    </div>
  );
}
