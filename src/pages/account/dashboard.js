import React from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  return (
    <div className="">
      <p>SOME AWESOME STUFF HERE</p>
    </div>
  );
}

export default Dashboard;
