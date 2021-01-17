import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../helpers";

const initialState = {
  currency: "NGN",
};
export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    getNextRoute: (state, action) => {
      state.nextRoute = action.payload;
    },
    getCurrency: (state) => {
      state.currency = getItem("currency", "local") || "NGN";
    },
    setCurrency: (state, action) => {
      setItem("currency", action.payload, "local");
      state.currency = action.payload;
    },
  },
});

export const selectNextRoute = (state) => state.app.nextRoute;
export const selectCurrency = (state) => state.app.currency;
export const { getNextRoute, setCurrency, getCurrency } = appSlice.actions;
export default appSlice.reducer;
