import { fetchDashboard } from "../../api";
import {
  getDashboardInit,
  getDashboard,
  getDashboardFailed,
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
