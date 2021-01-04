import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  shops: null,
  currentVendor: null,
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
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    getProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },
    getShopsSuccess: (state, action) => {
      state.shops = action.payload;
      state.isLoading = false;
    },
    getShopsFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },
    getCurrentVendor: (state, action) => {
      state.currentVendor = action.payload;
    },
  },
});

export const selectProduct = (state) => state.product;
export const {
  getProductInit,
  getProductsSuccess,
  getProductsFailed,
  getShopsSuccess,
  getShopsFailed,
  getCurrentVendor,
} = productSlice.actions;
export default productSlice.reducer;
