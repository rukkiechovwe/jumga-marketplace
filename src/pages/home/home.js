import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppTheme } from "../../redux/app/app-actions";
import { selectTheme } from "../../redux/app/app-slice";

export function Home() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppTheme("dark"));
  }, [dispatch]);
  return (
    <div>
      <center>HELLO WORLD</center>
      <p>App theme: {theme}</p>
    </div>
  );
}
