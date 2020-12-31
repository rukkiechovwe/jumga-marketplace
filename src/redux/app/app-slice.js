import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    theme: "light",
  },
  reducers: {
    getTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const selectTheme = (state) => state.app.theme;
export const { getTheme } = appSlice.actions;
export default appSlice.reducer;
