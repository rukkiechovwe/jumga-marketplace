import React from "react";
import { withRouter } from "react-router-dom";
import { history } from "../../../App";

function ShopProducts(props) {
  const {
    match: { path },
  } = props;

  return (
    <div className="w-full px-8 mt-4">
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
                      Price
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Reference
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Product 1
                          </div>
                          {/* <div class="text-sm text-gray-500">

                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">$ 200</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #37289112
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 rounded-full bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default withRouter(ShopProducts);