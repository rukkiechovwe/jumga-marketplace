import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationBar } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";

export function Home() {
  const user = useSelector(selectUser);
  return (
    <div>
      <NavigationBar user={user} />
    </div>
  );
}
