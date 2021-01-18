import { fetchDashboard, fetchDashboardProducts } from "../../api";
import {
  getDashboardInit,
  getDashboard,
  getDashboardFailed,
  getProducts,
} from "./dashboard-slice";

export const getUserDashboard = (user) => async (dispatch) => {
  dispatch(getDashboardInit());
  if (user) {
    const dashboard = await fetchDashboard(user);
    if (dashboard.err) {
      dispatch(
        getDashboardFailed(
          dashboard.err ?? dashboard.err.message ?? "Something went wrong"
        )
      );
    } else {
      dispatch(getDashboard(dashboard));
    }
  }
};
export const getDashboardProducts = (user) => async (dispatch) => {
  if (user) {
    const products = await fetchDashboardProducts(user);
    if (products.err) {
    } else {
      dispatch(getProducts(products));
    }
  }
};
