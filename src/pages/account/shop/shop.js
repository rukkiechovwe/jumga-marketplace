import React from "react";
import { useLocation } from "react-router-dom";

function Shop() {
  const location = useLocation();
  return (
    <div className="">
      <div className="flex flex-col phn:flex-row justify-between w-full p-3 mt-1">
        <div className="w-full md:w-1/2 pr-0 md:pr-4 pb-4 md:pb-0">
          <div className="h-24 rounded-md w-full bg-gray-500 p-4 text-white">
            NGN 200,005.00
          </div>
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-4 pt-4 md:pt-0">
          <div className="h-24 rounded-md w-full bg-gray-500 p-4 text-white">
            NGN 200,005.00
          </div>
        </div>
      </div>

      <div className="flex flex-col phn:flex-row justify-between w-full p-3 mt-1">
        <div className="w-full md:w-1/2 pr-0 md:pr-4 pb-4 md:pb-0">
          <p className="">Recent Activities</p>
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-4 pt-4 md:pt-0">
          <p className="">Quick Action</p>
          <div className="p-2 mt-3 rounded-md bg-gray-500 text-white">
            Add Product
          </div>
          <div className="p-2 mt-3 rounded-md bg-gray-500 text-white">
            Widthdraw Balance
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
