import React from "react";
import { useLocation } from "react-router-dom";

function Logout() {
  const location = useLocation();
  return (
    <div className="">
      <p>LOGOUT</p>
    </div>
  );
}

export default Logout;
