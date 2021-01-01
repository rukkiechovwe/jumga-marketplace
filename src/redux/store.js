import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/app-slice";
import authReducer from "./authentication/auth-slice";

export default configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});
