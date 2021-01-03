import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  isLoading: false,
  error: false,
  message: "",
};
export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getProductInit: (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = "";
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    getProductFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },
  },
});

export const selectProduct = (state) => state.product;
export const {
  getProductInit,
  getProductSuccess,
  getProductFailed,
} = productSlice.actions;
export default productSlice.reducer;
