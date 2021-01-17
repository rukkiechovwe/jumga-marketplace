import React from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { history } from "../../../App";
import { formatToNumber } from "../../../helpers";
import { selectDashboard } from "../../../redux/dashboard/dashboard-slice";

function ShopProducts(props) {
  const {
    match: { path },
  } = props;
  const dashboard = useSelector(selectDashboard);
  const empty = (
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
          If we shouldn't eat at night, why is there a light in the fridge? 😅
        </span>
        <br />
        Store is empty,
        <Link to={`${path}/add-product`}>
          <span className="text-blue-600 cursor-pointer">
            {" "}
            Add product to store
          </span>
        </Link>
      </p>
    </div>
  );
  return (
    <div className="w-full px-4 sm:px-8 mt-4">
      <div className="w-full flex flex-row justify-end mb-4">
        <button
          onClick={() => history.push(`${path}/add-product`)}
          className="flex flex-row items-center justify-center px-4 bg-green-400 p-2 my-2 rounded-full shadow-md text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5 pb-1/2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-sm"> ADD PRODUCT</span>
        </button>
      </div>
      {dashboard.products && dashboard.products.length === 0 ? (
        empty
      ) : (
        <div class="flex flex-col w-full">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product reference
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {dashboard.products.map((product) => {
                      const {
                        title,
                        price,
                        quantityAvailable,
                        productId,
                      } = product;
                      return (
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{productId}</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{price}</div>
                          </td>

                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {quantityAvailable}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              className="text-red-600 h-5 w-5"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(ShopProducts);
