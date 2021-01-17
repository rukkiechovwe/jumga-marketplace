import React from "react";
import { useSelector } from "react-redux";
import { formatToNumber } from "../../../helpers";
import { selectDashboard } from "../../../redux/dashboard/dashboard-slice";

function Orders() {
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
        Did you know that Dolphins sleep with one eyes open? Well, now you know
        😅
        <br />
        You've not made an order on Jumga
      </p>
    </div>
  );

  return (
    <div className="w-full px-8 mt-8">
      {dashboard.orders && dashboard.orders.length === 0 ? (
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
                        Order reference
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        No. of items
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
                    {dashboard.orders.map((o) => {
                      const {
                        orderId,
                        order,
                        totalAmount,
                        currency,
                        status,
                      } = o;
                      return (
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {orderId}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {currency} {formatToNumber(totalAmount)}
                            </div>
                          </td>

                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order && order.length}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 rounded-full bg-green-100 text-green-800">
                              {status}
                            </span>
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

export default Orders;
