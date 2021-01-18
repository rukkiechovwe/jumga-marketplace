import { useState } from "react";
import PinInput from "react-pin-input";
import { useSelector } from "react-redux";
import { BASENAME, initPayment } from "../../api";
import { encrypt, getReference } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";

export default function CardPin({ card, amount, currency, onSuccess }) {
  const user = useSelector(selectUser);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pay = async () => {
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
        mode: "pin",
        pin: pin,
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
        pay();
      }}
    >
      {error && (
        <span className="text-red-300 text-sm text-center w-full">{error}</span>
      )}
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
