import { useState } from "react";
import CardDetails from "./card-details";
import CardPin from "./pin";

export default function CardPayment({
  amount,
  label,
  currency,
  note,
  onSuccess,
  onFailed,
}) {
  const [step, setStep] = useState(0);
  const [card, setCard] = useState({});
  return (
    <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-gray-800 text-white h-full">
      <div className="p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
        <div className="py-8">
          <h2 className="text-4xl ">{`${label}`} | Payment</h2>
          <span className="text-gray-500 text-sm">{note}</span>
        </div>
        {step === 0 && (
          <CardDetails
            amount={amount}
            currency={currency}
            onSubmit={(res) => {
              setStep(1);
              setCard(res);
            }}
          />
        )}
        {step === 1 && (
          <CardPin
            card={card}
            amount={amount}
            currency={currency}
            onSuccess={(res) => {
              console.log(res);
            }}
          />
        )}
      </div>
    </div>
  );
}
