import React from "react";
import { withRouter, useLocation, Link, Switch, Route } from "react-router-dom";
import { history } from "../../../App";
import items from "../sidebar-items";
import logo from "../../../assets/images/logo.png";
import { selectUser } from "../../../redux/authentication/auth-slice";
import { useSelector } from "react-redux";
import { Avatar, Error } from "../../../components";

function UserDashboard(props) {
  const {
    match: { path },
  } = props;
  const pathname = useLocation().pathname;
  const user = useSelector(selectUser);
  return (
    <div className="flex justify-between">
      <div className="hidden md:block w-1/6 bg-white h-screen shadow-sm">
        <div className="h-20 w-full flex-shrink-0 flex items-center">
          <Link to={path}>
            <img src={logo} className="h-28" alt="jumga-logo" />
          </Link>
        </div>
        <div className="flex flex-col mt-4">
          {items.map((item) => {
            return (
              <div
                className={`p-2 mx-2 mt-1 flex flex-row justify-start items-center rounded-md ${
                  pathname === `${path}${item.route}` && `bg-gray-100`
                }
            ${
              pathname === `${path}${item.route}`
                ? `text-black`
                : `text-gray-500`
            } cursor-pointer`}
              >
                <span className="mr-2">{item.icon}</span>
                <span onClick={() => history.push(`${path}${item.route}`)}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-5/6">
        <div className="flex justify-end pr-8 items-center w-full h-12 shadow-sm bg-white">
          <div>
            <p className="mr-4">{(user && user.email) || ""}</p>
          </div>
          <Avatar />
        </div>
        <div>{/* illustration */}</div>
        <Switch>
          {items.map((item) => {
            return (
              <Route
                path={`${path}${item.route}`}
                component={item.component || Error}
              />
            );
          })}
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(UserDashboard);
