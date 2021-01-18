import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../helpers";

const initialState = {
  products: null,
  merchantProduct: null,
  shops: null,
  currentMerchant: null,
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
    getCurrentMerchant: (state, action) => {
      state.currentMerchant = action.payload || getItem("merchant", "session");
    },
    setCurrentMerchant: (state, action) => {
      setItem("merchant", action.payload, "session");
      state.currentMerchant = action.payload;
    },
  },
});

export const selectProduct = (state) => state.product;
export const selectMerchant = (state) => state.product.currentMerchant;
export const {
  getProductInit,
  getProductsSuccess,
  getProductsFailed,
  getShopsSuccess,
  getShopsFailed,
  getCurrentMerchant,
  setCurrentMerchant,
} = productSlice.actions;
export default productSlice.reducer;
