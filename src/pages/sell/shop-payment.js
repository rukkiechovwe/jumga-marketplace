import { useReducer, useState } from "react";
import loginImg from "../../assets/images/loginImg.jpg";
import { CardPayment } from "../../components";

export default function ShopPayment() {
  return (
    <div className="relative h-screen w-full sssss">
      <div className="hidden sm:block w-1/2 h-full">
        <div
          className="h-full bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${loginImg})` }}
        ></div>
      </div>
      <CardPayment
        label="Create Store"
        note="You'll be charged a token of $20 to create a store"
        amount={20}
        currency="USD"
        onSuccess={() => {}}
        onFailed={() => {}}
      />
    </div>
  );
}
