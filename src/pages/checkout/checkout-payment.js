import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { placeCheckoutOrder } from "../../api/shop";
import { history } from "../../App";
import loginImg from "../../assets/images/loginImg.jpg";
import { CardPayment, Dialog, Error } from "../../components";
import { splitPayment } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCart, selectCartTotalAmount } from "../../redux/cart/cart-slice";
import { selectVendor } from "../../redux/product/product-slice";

export default function CheckoutPayment() {
  const location = useLocation();
  const address = location.state && location.state.payload;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const totalAmount = useSelector(selectCartTotalAmount);
  const vendor = useSelector(selectVendor);
  const user = useSelector(selectUser);
  const { cart } = useSelector(selectCart);

  const placeOrder = async () => {
    let payload = {
      address: address,
      cart: cart,
      user: user,
      vendor: vendor,
      totalAmount: totalAmount,
    };
    try {
      const res = await placeCheckoutOrder(payload);
      if (res.err) {
        setError(res.err ? res.err : "Something went wrong");
      } else {
        setStatus("success");
      }
    } catch (error) {
      setError(error.toString());
    }
    setShow(true);
  };

  return (
    <div className="relative h-screen w-full">
      {show ? (
        status === "success" ? (
          <Dialog
            state="success"
            title="Your order was successful"
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
      {!address && <Error mt="0" />}
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
            amount={totalAmount}
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
            onPaymentSuccess={(response) => {
              placeOrder();
            }}
          />
        </div>
      )}
    </div>
  );
}
