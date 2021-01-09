import React from 'react'

function ShopActivity() {
    return (
        <div className="flex justify-between">
            <div className="hidden md:block w-1/5 bg-black text-white h-screen">
                <p className="p-3">JUMGA</p>
                <div className="flex flex-col mt-4">
                    <a href="#" className="p-3 mt-2 bg-gray-100 text-black">Shop</a>
                    <a href="#" className="p-3 mt-2">Order</a>
                    <a href="#" className="p-3 mt-2">Settings</a>
                    <a href="#" className="p-3 mt-2">Logout</a>
                </div>
            </div>
            <div className="w-full md:w-4/5 p-2 bg-gray-100">
                <div className="flex justify-between w-full p-3">
                    <p className="">MY AWESOME STORE</p>
                    <div>
                        <p className="">NGN 200,005.00</p>
                    </div>
                </div>

                <div className="flex flex-col phn:flex-row justify-between w-full p-3 mt-1">
                    <div className="w-full md:w-1/2 pr-0 md:pr-4 pb-4 md:pb-0">
                        <div className="h-24 rounded-md w-full bg-gray-500 p-4 text-white">NGN 200,005.00</div>
                    </div>
                    <div className="w-full md:w-1/2 pl-0 md:pl-4 pt-4 md:pt-0">
                        <div className="h-24 rounded-md w-full bg-gray-500 p-4 text-white">NGN 200,005.00</div>
                    </div>
                </div>

                <div className="flex flex-col phn:flex-row justify-between w-full p-3 mt-1">
                    <div className="w-full md:w-1/2 pr-0 md:pr-4 pb-4 md:pb-0">
                        <p className="">Recent Activities</p>
                    </div>
                    <div className="w-full md:w-1/2 pl-0 md:pl-4 pt-4 md:pt-0">
                        <p className="">Quick Action</p>
                        <div className="p-2 mt-3 rounded-md bg-gray-500 text-white">Add Product</div>
                        <div className="p-2 mt-3 rounded-md bg-gray-500 text-white">Widthdraw Balance</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopActivity
