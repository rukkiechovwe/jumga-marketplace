import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { history } from "../../App";
import loginImg from "../../assets/images/loginImg.jpg";
import { selectUser } from "../../redux/authentication/auth-slice";

export default function CheckoutAddress() {
  const [address, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case "GET_INPUT":
        const event = action.payload;
        const { name, value } = event.target;
        return { ...state, [name]: value };
      case "ERROR":
        return { ...state, error: action.payload, isLoading: false };
      default:
        throw new Error("No actionType");
    }
  }, {});

  return (
    <div className="relative h-screen w-full">
      <div className="hidden sm:block w-1/2 h-full">
        <div
          className="h-full bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${loginImg})` }}
        ></div>
      </div>
      <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-white h-full">
        <div className="p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
          <div className="py-8">
            <h2 className="text-4xl">Checkout</h2>
            <span className="text-gray-500 text-sm">Add Shipping Address</span>
          </div>
          <form
            className="flex flex-col justify-center items-center w-5/6"
            onSubmit={(event) => {
              event.preventDefault();
              history.push(`/checkout/payment?step=2`, {
                payload: address,
              });
            }}
          >
            <input
              className="w-full p-2 my-3 focus:outline-none rounded text-black"
              name="city"
              placeholder="CITY"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            <input
              className="w-full p-2 my-3 focus:outline-none rounded text-black"
              placeholder="ADDRESS"
              name="address"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            <input
              className="w-full p-2 my-3 focus:outline-none rounded text-black"
              name="state"
              placeholder="STATE"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            <input
              className="w-full p-2 my-3 focus:outline-none rounded text-black"
              placeholder="COUNTRY"
              name="country"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            <input
              className="w-full p-2 my-3 focus:outline-none rounded text-black"
              name="zipcode"
              placeholder="ZIPCODE"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            <button
              className="px-4 bg-green-400 p-2 my-3 rounded-full text-white focus:outline-none"
              type="submit"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
