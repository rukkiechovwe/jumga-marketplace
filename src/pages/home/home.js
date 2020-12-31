import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationBar } from "../../components";
import { selectTheme } from "../../redux/app/app-slice";

export function Home() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <div>
      <NavigationBar />
    </div>
  );
}
