import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isLoading: false,
  error: false,
  message: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartActionStarted: (state, action) => {
      state.isLoading = true;
      state.error = false;
      state.message = action.payload;
    },
    getCart: (state, action) => {
      state.cart = action.payload;
      state.error = false;
      state.isLoading = false;
    },
    addToCart: (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
      state.message = "Item added to cart";
    },
    addToCartFailed: (state) => {
      state.isLoading = false;
      state.error = true;
      state.message = "Error adding item to cart";
    },
    removeFromCart: (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
      state.message = "Item removed from cart";
    },
    removeFromCartFailed: (state) => {
      state.isLoading = false;
      state.error = true;
      state.message = "Error removing item from cart";
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartTotal = (state) =>
  (state.cart.cart && state.cart.cart.length) || 0;
export const {
  addToCart,
  removeFromCart,
  getCart,
  cartActionStarted,
  addToCartFailed,
  removeFromCartFailed,
} = cartSlice.actions;
export default cartSlice.reducer;
