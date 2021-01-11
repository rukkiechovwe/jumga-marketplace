import { useState } from "react";
import { useLocation } from "react-router-dom";
import { history } from "../../App";
import loginImg from "../../assets/images/loginImg.jpg";
import { CardPayment, Dialog, Error } from "../../components";

export default function CheckoutPayment() {
  const location = useLocation();
  const address = location.state && location.state.address;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  // const placeOrder = async () => {
  //   let payload = { address: address, cart: {} };
  //   try {
  //     const res = await placeCheckoutOrder(payload);
  //     if (res.err) {
  //       setError(res.err ? res.err : "Something went wrong");
  //     } else {
  //       setStatus("success");
  //     }
  //   } catch (error) {
  //     setError(error.toString());
  //   }
  //   setShow(true);
  // };
  return (
    <div className="relative h-screen w-full">
      {show ? (
        status === "success" ? (
          <Dialog
            state="success"
            title="Payment successful"
            message={`
              Your order "${""}" was successfully placed
            `}
            callbackText="Continue Shopping"
            callback={() => {
              history.replace("/");
            }}
          />
        ) : (
          <Dialog
            state="failed"
            title="Payment failed"
            message={error}
            callbackText="Try again"
            cancel={() => {
              setShow(false);
              setStatus("");
            }}
            callback={() => {
              setShow(false);
              setStatus("");
            }}
          />
        )
      ) : null}
      {!address && <Error />}
      {address && (
        <div>
          <div className="hidden sm:block w-1/2 h-full">
            <div
              className="h-full bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: `url(${loginImg})` }}
            ></div>
          </div>
          <CardPayment
            label="Checkout"
            note="Complete your order"
            amount={20}
            currency="USD"
            onPaymentFailed={(response) => {
              setShow(true);
              setStatus("failed");
              setError(
                response ||
                  response.message ||
                  "Could not complete transaction, Try again"
              );
            }}
            onPaymentSuccess={(response) => {}}
          />
        </div>
      )}
    </div>
  );
}
