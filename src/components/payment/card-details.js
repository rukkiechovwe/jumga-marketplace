import { useReducer, useState } from "react";

export default function CardDetails({ currency, amount, onSubmit }) {
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
  return (
    <form
      className="flex flex-col justify-center items-center w-5/6"
      onSubmit={(event) => {
        event.preventDefault();
        const em = card.expiry_date.substring(0, 2);
        const ey = card.expiry_date.substring(3);
        card.expiry_month = em;
        card.expiry_year = ey;
        let _card = { ...card };
        delete _card.expiry_date;
        onSubmit(_card);
      }}
    >
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
        PAY {`${currency === "USD" && " $"}${amount}`}
      </button>
    </form>
  );
}
