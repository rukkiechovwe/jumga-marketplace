import { getTheme } from "./app-slice";

export const getAppTheme = (theme) => (dispatch) => {
  setTimeout(() => dispatch(getTheme(theme)), 3000);
};
