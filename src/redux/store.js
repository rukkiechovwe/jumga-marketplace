import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/app-slice";
import authReducer from "./authentication/auth-slice";
import cartReducer from "./cart/cart-slice";
import productReducer from "./product/product-slice";
import dashboardReducer from "./dashboard/dashboard-slice";

export default configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    dashboard: dashboardReducer,
  },
});
