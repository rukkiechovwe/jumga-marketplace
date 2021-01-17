import React from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../avatar/avatar";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrency, setCurrency } from "../../redux/app/app-slice";

function NavigationBar(props) {
  const location = useLocation();
  const currency = useSelector(selectCurrency);
  const dispatch = useDispatch();
  const user = props.user;

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img src={logo} className="h-28" alt="jumga-logo" />
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex items-center justify-end space-x-4 mr-2">
              <Link
                to={`/cart`}
                className="flex flex-row items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>

                {props.totalInCart > 0 && (
                  <span class="bg-white -mt-4 -ml-2 pr-1 pl-1 rounded text-black text-xs">
                    {props.totalInCart}
                  </span>
                )}
              </Link>
              {user && !user.isMerchant && (
                <Link
                  to={`/sell`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sell
                </Link>
              )}
              <Link
                to={
                  user
                    ? `/account/dashboard`
                    : `/login?from=${location.pathname}`
                }
                className="flex flex-row items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {user ? "My Account" : "Login"}
              </Link>
            </div>
            <button className="bg-gray-800 p-1 mr-4 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <Avatar />
            </button>
            <select
              value={currency}
              name="currency"
              className="appearance-none p-2 focus:outline-none rounded border text-white bg-black border-none"
              onChange={(event) => {
                dispatch(setCurrency(event.target.value));
              }}
            >
              <option value="NGN">NGN</option>
              <option value="GHS">GHS</option>
              <option value="KES">KES</option>
              <option value="EUR">EUR</option>
            </select>
            <div className="ml-3 relative">
              <div
                className={`hidden origin-top-right absolute right-0 mt-4 w-36 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#"
                  className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Account
                </a>
                <a
                  href="#"
                  className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Sell
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <Link
              to={`/cart`}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Cart
              <span>({props.totalInCart})</span>
            </Link>
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <Link
              to={`/login?from=${location.pathname}`}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {user ? user.email : "Login"}
            </Link>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
