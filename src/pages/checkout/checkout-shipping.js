import { useReducer, useState } from "react";
import { history } from "../../App";
import loginImg from "../../assets/images/loginImg.jpg";
import { InputError } from "../../components";
import { validateAddressForm } from "../../helpers";

export default function CheckoutAddress() {
  const [error, setError] = useState({});
  const [address, dispatchInputEvent] = useReducer(
    (state, action) => {
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
    },
    { address: "", city: "", state: "", zipcode: "" }
  );

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
              const errors = validateAddressForm(address);
              if (errors.atLeastAnError) {
                setError(errors);
              } else {
                history.push(`/checkout/payment?step=2`, {
                  payload: address,
                });
              }
            }}
          >
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              placeholder="ADDRESS"
              name="address"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {error.address && <InputError message={error.address} />}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              name="city"
              placeholder="CITY"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {error.city && <InputError message={error.city} />}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              name="state"
              placeholder="STATE"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {error.state && <InputError message={error.state} />}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              name="zipcode"
              placeholder="ZIPCODE"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {error.zipcode && <InputError message={error.zipcode} />}
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
