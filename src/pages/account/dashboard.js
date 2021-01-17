import React, { useEffect } from "react";
import { withRouter, useLocation, Link, Switch, Route } from "react-router-dom";
import { history } from "../../App";
import items from "./sidebar-items";
import { selectUser } from "../../redux/authentication/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Error, Loading } from "../../components";
import logo from "../../assets/images/logo.png";
import AddProduct from "./products/add-product";
import { selectDashboard } from "../../redux/dashboard/dashboard-slice";
import { getUserDashboard } from "../../redux/dashboard/dashboard-actions";

function Dashboard(props) {
  const {
    match: { path },
  } = props;
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const user = useSelector(selectUser);
  const dashboard = useSelector(selectDashboard);

  useEffect(() => {
    dispatch(getUserDashboard(user && user));
  }, [user]);

  const _dashboard = (
    <div className="flex justify-between">
      <div className="hidden md:block w-1/6 bg-white h-screen shadow-sm">
        <div className="h-20 w-full flex-shrink-0 flex items-center">
          <Link to="/">
            <img src={logo} className="h-28" alt="jumga-logo" />
          </Link>
        </div>
        <div className="flex flex-col mt-4">
          {user && user.isMerchant
            ? items.merchantItems.map((item) => {
                return (
                  <div
                    onClick={() => history.push(`${path}${item.route}`)}
                    className={`p-2 mx-2 mt-1 flex flex-row justify-start items-center rounded-md ${
                      pathname === `${path}${item.route}` && `bg-gray-100`
                    }
        ${
          pathname === `${path}${item.route}` ? `text-black` : `text-gray-500`
        } cursor-pointer`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span
                      className={`${
                        item.route === "/logout" && `text-red-600`
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })
            : items.userItems.map((item) => {
                return (
                  <div
                    onClick={() => history.push(`${path}${item.route}`)}
                    className={`p-2 mx-2 mt-1 flex flex-row justify-start items-center rounded-md ${
                      pathname === `${path}${item.route}` && `bg-gray-100`
                    }
        ${
          pathname === `${path}${item.route}` ? `text-black` : `text-gray-500`
        } cursor-pointer`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span
                      className={`${
                        item.route === "/logout" && `text-red-600`
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="w-full md:w-5/6">
        <div className="flex justify-between pr-8 items-center w-full h-12 shadow-sm bg-white">
          <span className="ml-4">
            {pathname === `${path}/products/add-product` && "Add New Product"}
            {items.merchantItems.map((item) => {
              if (pathname === `${path}/logout`) return "";
              if (pathname === `${path}${item.route}`) return item.label;
            })}
          </span>
          <div className="mr-4 flex flex-row items-center justify-center">
            <p className="pr-2">{(user && user.email) || ""}</p>
            <Avatar />
          </div>
        </div>
        <Switch>
          <Route path={`${path}/products/add-product`} component={AddProduct} />
          {items.merchantItems.map((item) => {
            return (
              <Route
                exact={`${item.route}` === ""}
                path={`${path}${item.route}`}
                component={item.component}
              />
            );
          })}
        </Switch>
      </div>
    </div>
  );
  return (
    <>
      {dashboard.isLoading && <Loading />}
      {dashboard.error && <Error message="Error loading dashboard" />}
      {!dashboard.isLoading && !dashboard.error && _dashboard}
    </>
  );
}

export default withRouter(Dashboard);
