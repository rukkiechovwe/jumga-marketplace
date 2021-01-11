import { useReducer, useState } from "react";
import { BASENAME } from "../../api";
import { initPayment } from "../../api/payment";
import { encrypt, getReference } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { useSelector } from "react-redux";

// TODO: use select for country field
export default function CardAddress({ card, currency, amount, onSuccess }) {
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
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initPay = async () => {
    setLoading(true);
    setError("");
    const payload = {
      ...card,
      email: user.email,
      amount: amount,
      currency: currency,
      redirect_url: `${BASENAME}/confirm-payment`,
      tx_ref: getReference(),
      authorization: {
        mode: "avs_noauth",
        ...address,
      },
    };

    const res = await initPayment(encrypt(payload));
    setLoading(false);
    if (res.err) {
      setError(res.err ?? "Something went wrong.");
    } else {
      onSuccess({ card, res });
    }
  };
  return (
    <form
      className="flex flex-col justify-center items-center w-5/6"
      onSubmit={(event) => {
        event.preventDefault();
        initPay();
      }}
    >
      {error && (
        <span className="text-red-300 text-sm text-center w-full">{error}</span>
      )}
      <p className="text-white-300 text-sm text-center w-full">
        Address verification required
      </p>
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
        {loading ? "Please wait..." : "CONTINUE"}
      </button>
    </form>
  );
}
