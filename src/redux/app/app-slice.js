import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    getNextRoute: (state, action) => {
      state.nextRoute = action.payload;
    },
  },
});

export const selectNextRoute = (state) => state.app.nextRoute;
export const { getNextRoute } = appSlice.actions;
export default appSlice.reducer;
