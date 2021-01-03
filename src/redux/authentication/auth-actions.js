import {
  createUser,
  passwordReset,
  userLogin,
  db,
  auth,
} from "../../api/firebase";
import { history } from "../../App";
import { getUrlParam } from "../../helpers/utils";
import { getCart } from "../cart/cart-slice";
import {
  getUserSuccess,
  getUserFailed,
  authActionStarted,
  authSuccess,
  resetPasswordSuccess,
  resetPasswordFailed,
  authFailed,
} from "./auth-slice";

export const getUser = () => async (dispatch) => {
  dispatch(authActionStarted());
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const res = await db.collection("users").doc(user.uid).get();
        const userMd = res.data();
        dispatch(getUserSuccess(userMd));
        // get the user cart from firestore
        dispatch(getCart(userMd.cart));
      } catch (err) {
        dispatch(getUserFailed(err.message));
      }
    } else {
      dispatch(getUserFailed("Error"));
    }
  });
};

export const authenticateUser = (user, authType) => async (dispatch) => {
  dispatch(authActionStarted());
  const res =
    authType === "login"
      ? await userLogin(user.email, user.password)
      : await createUser(user);
  if (res.err) {
    dispatch(authFailed(res.err.message));
  } else {
    dispatch(authSuccess(res.user));
    history.push(getUrlParam("from"));
  }
};

export const resetPassword = (email) => async (dispatch) => {
  dispatch(authActionStarted());
  const res = await passwordReset(email);
  if (res.err) {
    dispatch(resetPasswordFailed(res.err.message));
  } else {
    dispatch(resetPasswordSuccess());
  }
};
