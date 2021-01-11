import { useReducer, useState } from "react";
import { BASENAME } from "../../api";
import { initPayment } from "../../api/payment";
import { encrypt, getReference } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { useSelector } from "react-redux";

export default function CardInfo({ currency, amount, onSuccess }) {
  const [card, dispatchInputEvent] = useReducer((state, action) => {
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

  const initPay = async (card) => {
    setLoading(true);
    setError("");
    const payload = {
      ...card,
      email: user.email,
      amount: amount,
      currency: currency,
      redirect_url: `${BASENAME}/confirm-payment`,
      tx_ref: getReference(),
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
        let _card = {
          cvv: card.cvv.replace(/\s/g, "").trim(),
          card_number: card.card_number.replace(/\s/g, "").trim(),
          expiry_month: card.expiry_date.substring(0, 2),
          expiry_year: card.expiry_date.substring(3),
        };
        initPay(_card);
      }}
    >
      {error && (
        <span className="text-red-300 text-sm text-center w-full">{error}</span>
      )}

      <input
        className="w-full p-2 my-3 focus:outline-none rounded text-black"
        name="fullname"
        placeholder="CARDHOLDER NAME"
        onChange={(event) => {
          event.persist();
          dispatchInputEvent({ type: "GET_INPUT", payload: event });
        }}
      />
      <input
        className="w-full p-2 my-3 focus:outline-none rounded text-black"
        placeholder="CARD NUMBER"
        name="card_number"
        maxLength="27"
        onChange={(event) => {
          event.persist();
          dispatchInputEvent({ type: "GET_INPUT", payload: event });
        }}
      />
      <div className="w-full my-3 flex flex-row justify-between sm:flex-column">
        <input
          className="w-full p-2 mr-3 focus:outline-none rounded text-black"
          placeholder="EXPIRY DATE"
          maxLength="5"
          name="expiry_date"
          inputMode="numeric"
          onChange={(event) => {
            event.persist();
            // handle delete event
            if (event.target.value.length === 2) {
              event.target.value += "/";
            }
            dispatchInputEvent({ type: "GET_INPUT", payload: event });
          }}
        />
        <input
          className="w-full p-2 myl-3 focus:outline-none rounded text-black"
          placeholder="CVV"
          name="cvv"
          maxLength="4"
          onChange={(event) => {
            event.persist();
            dispatchInputEvent({ type: "GET_INPUT", payload: event });
          }}
        />
      </div>
      <button
        className="px-4 bg-green-400 p-2 my-3 rounded-full text-white focus:outline-none"
        type="submit"
      >
        {loading
          ? "Please wait..."
          : `PAY ${currency === "USD" && " $"}${amount}`}
      </button>
    </form>
  );
}