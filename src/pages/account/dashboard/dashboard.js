import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatToNumber } from "../../../helpers";
import {
  selectHighestPerformer,
  selectUser,
} from "../../../redux/authentication/auth-slice";
import {
  selectProductsCount,
  selectSalesCount,
} from "../../../redux/dashboard/dashboard-slice";

function Dashboard() {
  const user = useSelector(selectUser);
  const productsCount = useSelector(selectProductsCount);
  const salesCount = useSelector(selectSalesCount);
  const highestPerformer = useSelector(selectHighestPerformer);
  const notMerchant = (
    <div className="w-full mt-16 px-8 flex flex-col items-center justify-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-200 h-24 w-28 mb-4"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-center">
        <span className="text-sm text-gray-600">
          Did you know that Dolphins sleep with one eyes open? Well, now you
          know 😅
        </span>
        <br />
        <Link to="/sell">
          <span className="text-blue-600 cursor-pointer">
            Become a merchant{" "}
          </span>
        </Link>
        to see more on this dashboard
      </p>
    </div>
  );

  return (
    <div className="">
      {user && user.isMerchant ? (
        <>
          <div className="flex flex-col phn:flex-row justify-between w-full px-3 phn:px-8 mt-8">
            <div className="w-full h-24 bg-white rounded-md shadow-sm md:w-1/2 m-2">
              <div className="h-full flex flex-row justify-between items-center px-8">
                <div className="flex flex-col justify-start items-start">
                  <span className="text-xl text-black">
                    {highestPerformer.currency}{" "}
                    {formatToNumber(highestPerformer.value)}
                  </span>
                  <span className="text-gray-600">Balance</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="text-gray-200 h-12"
                    fill="currentColor"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full h-24 bg-white rounded-md shadow-sm md:w-1/2 m-2">
              <div className="h-full flex flex-row justify-between items-center px-8">
                <div className="flex flex-col justify-start items-start">
                  <span className="text-xl text-black">{salesCount}</span>
                  <span className="text-gray-600">Sales</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-gray-200 h-12"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full h-24 bg-white rounded-md shadow-sm md:w-1/2 m-2">
              <div className="h-full flex flex-row justify-between items-center px-8">
                <div className="flex flex-col justify-start items-start">
                  <span className="text-xl text-black">{productsCount}</span>
                  <span className="text-gray-600">Products</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="text-gray-200 h-12"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full px-9 mt-8">
            <p className="text-lg text-black mb-2">ALL WALLETS</p>
            {user &&
              Object.values(user.walletBalance)
                .sort((a, b) => a - b)
                .map((balance, i) => {
                  let currency = Object.keys(user.walletBalance)[i];
                  return (
                    <span className="text-lg text-black">
                      <span className="text-gray-500">{currency} </span>
                      {formatToNumber(balance)}
                    </span>
                  );
                })}
          </div>
        </>
      ) : (
        notMerchant
      )}
    </div>
  );
}

export default Dashboard;
