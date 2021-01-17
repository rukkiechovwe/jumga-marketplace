import { useState } from "react";
import { validatePayment } from "../../api";

export default function CardOtp({ reference, onSuccess, onFailed }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePay = async () => {
    setLoading(true);
    const payload = {
      flw_ref: reference.flw_ref,
      type: reference.payment_type,
      otp: otp,
    };
    const res = await validatePayment(payload);
    setLoading(false);
    if (res.err) {
      onFailed(res.err ?? "Could not complete transaction, Try again");
    } else {
      onSuccess(res);
    }
  };
  return (
    <form
      className="flex flex-col justify-center items-center w-5/6"
      onSubmit={(event) => {
        event.preventDefault();
        validatePay();
      }}
    >
      <input
        className="w-full p-2 my-3 focus:outline-none rounded text-black text-center text-lg"
        name="otp"
        placeholder="Enter the OTP sent to your devices"
        onChange={(event) => setOtp(event.target.value)}
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
