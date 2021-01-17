import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../api";
import { history } from "../App";
import { Loading } from "../components";
import { clearLocalStorage } from "../helpers";
import { logOut } from "../redux/authentication/auth-slice";
import { clearCart } from "../redux/cart/cart-actions";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    await userLogout();
    clearLocalStorage();
    dispatch(clearCart());
    dispatch(logOut());
    history.push("/");
  };

  return (
    <div className="w-full items-center">
      <Loading message="Logging out..." />
    </div>
  );
}

export default Logout;
