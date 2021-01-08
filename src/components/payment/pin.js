import { useState } from "react";
import PinInput from "react-pin-input";
import { useSelector } from "react-redux";
import { BASENAME } from "../../api";
import { initPayment } from "../../api/payment";
import { encrypt, getReference } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";

export default function CardPin({ card, amount, currency, onSuccess }) {
  const user = useSelector(selectUser);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pay = async () => {
    setLoading(true);
    const details = {
      ...card,
      email: user.email,
      amount: amount,
      currency: currency,
      redirect_url: `${BASENAME}/confirm-payment`,
      tx_ref: getReference(),
      authorization: {
        mode: "pin",
        pin: pin,
      },
    };

    const res = await initPayment(encrypt(details));
    if (res.err) {
      setError(res.err ?? "Something went wrong.");
    } else {
      onSuccess(res);
    }
    setLoading(false);
  };
  return (
    <form
      className="flex flex-col justify-center items-center w-5/6"
      onSubmit={(event) => {
        event.preventDefault();
        pay();
      }}
    >
      <label className="w-full text-center">Enter card pin</label>
      {error && <span className="text-red text-center w-full">{error}</span>}
      <PinInput
        length={4}
        secret
        type="numeric"
        inputMode="number"
        inputStyle={{
          borderColor: "grey",
          margin: "16px",
          borderRadius: "10px",
        }}
        inputFocusStyle={{ borderColor: "white" }}
        onComplete={(value) => {
          setPin(value);
        }}
        regexCriteria={/^[0-9]*$/}
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
