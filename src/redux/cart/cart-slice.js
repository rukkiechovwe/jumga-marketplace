import { createSlice } from "@reduxjs/toolkit";
import { getItem, getPriceInXCurrency, setItem } from "../../helpers";

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
    getCart: (state, action) => {
      state.cart = action.payload || getItem("cart", "session") || [];
      state.error = false;
      state.isLoading = false;
    },
    addToCart: (state, action) => {
      setItem("cart", action.payload, "session");
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
      setItem("cart", action.payload, "session");
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
export const selectCartTotal = (state) => {
  let cart = state.cart.cart || [];
  let total = 0;
  for (const item of cart) {
    total += item.quantity;
  }
  return total;
};
export const selectCartTotalAmount = (state, currency) => {
  let cart = state.cart.cart || [];
  let total = 0;
  for (const item of cart) {
    let price = getPriceInXCurrency(currency, item);
    total += price.amount * item.quantity;
  }
  return total.toFixed(2);
};

export const {
  addToCart,
  removeFromCart,
  getCart,
  addToCartFailed,
  removeFromCartFailed,
} = cartSlice.actions;
export default cartSlice.reducer;
