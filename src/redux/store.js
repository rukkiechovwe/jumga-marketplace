import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication/auth-slice";
import cartReducer from "./cart/cart-slice";
import productReducer from "./product/product-slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
