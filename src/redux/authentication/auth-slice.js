import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: false,
  isAuthenticated: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    getUserFailed: (state) => {
      state.isLoading = false;
    },
    authActionStarted: (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = "";
    },
    authSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },
    authReset: (state) => {
      state = initialState;
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
      state.message =
        "A RESET PASSWORD EMAIL HAS BEEN SET TO YOUR EMAIL ADDRESS, PLEASE CHECK YOUR INBOX TO SECURELY RESET YOUR PASSWORD";
    },
    resetPasswordFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },
    logOut: (state) => {
      state = initialState;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAuth = (state) => state.auth;
export const {
  getUserSuccess,
  getUserFailed,
  authActionStarted,
  authSuccess,
  authFailed,
  resetPasswordSuccess,
  resetPasswordFailed,
  authReset,
  logOut,
} = authSlice.actions;
export default authSlice.reducer;
