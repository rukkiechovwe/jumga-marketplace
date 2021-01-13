import { useState } from "react";
import CardPin from "./pin";
import CardOtp from "./otp";
import CardAddress from "./address";
import CardInfo from "./card-info";

export default function CardPayment({
  amount,
  label,
  currency,
  note,
  loading,
  onPaymentSuccess,
  onPaymentFailed,
}) {
  const [step, setStep] = useState(0);
  const [stepNote, setStepNote] = useState("");
  const [reference, setReference] = useState({});
  const [card, setCard] = useState({});

  // proceed based on the suggested authorization mode
  const decideNextStep = (res) => {
    // save charge reference
    setReference(res.res && res.res.data);
    setCard(res.card && res.card);
    setStepNote("");
    const authMode = res.res && res.res.meta && res.res.meta.authorization.mode;
    switch (authMode) {
      case "pin":
        setStep(1);
        setStepNote("Enter card pin");
        break;
      case "avs_noauth":
        setStep(2);
        break;
      case "redirect":
        setStep(3);
        // const redirectURL = res.res.meta.authorization.redirect;
        // const extWindow = window.open(redirectURL, "_blank");
        // // validate charge when external window is closed
        // extWindow.onunload = function () {};
        break;
      case "otp":
        setStep(3);
        break;
      default:
        setStep(0);
        onPaymentFailed(res);
    }
  };
  return (
    <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-gray-800 text-white h-full">
      <div className="p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
        <div className="py-8">
          <h2 className="text-4xl ">{`${label && `${label} | `}`}Payment</h2>
          <span className="text-gray-500 text-sm">
            {note && note} {`${stepNote && `( ${stepNote.toUpperCase()} )`}`}
          </span>
          <p className="text-white">{loading && "Please wait..."}</p>
        </div>
        {step === 0 && (
          <CardInfo
            amount={amount}
            currency={currency}
            onSuccess={(res) => {
              if (res.data && res.data.status === "successful") {
                onPaymentSuccess(res.data);
              } else {
                decideNextStep(res);
              }
            }}
          />
        )}
        {step === 1 && (
          <CardPin
            card={card}
            amount={amount}
            currency={currency}
            onSuccess={(res) => {
              if (res.data && res.data.status === "successful") {
                onPaymentSuccess(res.data);
              } else {
                decideNextStep(res);
              }
            }}
          />
        )}
        {step === 2 && (
          <CardAddress
            card={card}
            amount={amount}
            currency={currency}
            onSuccess={(res) => {
              if (res.data && res.data.status === "successful") {
                onPaymentSuccess(res.data);
              } else {
                decideNextStep(res);
              }
            }}
          />
        )}
        {step === 3 && (
          <CardOtp
            reference={reference}
            onSuccess={(res) => {
              if (res.data && res.data.status === "successful") {
                onPaymentSuccess(res.data);
              } else {
                decideNextStep(res);
              }
            }}
            onFailed={(err) => {
              setStep(0);
              onPaymentFailed(err);
            }}
          />
        )}
      </div>
    </div>
  );
}
