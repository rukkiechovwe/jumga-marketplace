import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  orders: null,
  sales: null,
  isLoading: false,
  error: false,
  message: "",
};
export const dashboardSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getDashboardInit: (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = "";
    },
    getDashboard: (state, action) => {
      const { sales, orders, products } = action.payload;
      state.products = products;
      state.sales = sales;
      state.orders = orders;
      state.isLoading = false;
      state.error = false;
      state.message = "";
    },
    getDashboardFailed: (state, action) => {
      state.error = true;
      state.isLoading = false;
      state.message = action.payload;
    },
    getProducts: (state, action) => {
      const { products } = action.payload;
      state.products = products;
    },
    // get sales, orders
  },
});

export const selectDashboard = (state) => state.dashboard;
export const selectProductsCount = (state) =>
  state.dashboard.products ? state.dashboard.products.length : 0;
export const selectSalesCount = (state) =>
  state.dashboard.products ? state.dashboard.sales.length : 0;

export const {
  getDashboardInit,
  getDashboard,
  getDashboardFailed,
  getProducts,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
