import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { placeCheckoutOrder } from "../../api";
import { history } from "../../App";
import storeImg from "../../assets/images/storeImg.jpg";
import { CardPayment, Dialog, Error } from "../../components";
import { getReference, splitPayment } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCart, selectCartTotalAmount } from "../../redux/cart/cart-slice";
import { selectMerchant } from "../../redux/product/product-slice";
import { selectCurrency } from "../../redux/app/app-slice";
import { clearCart } from "../../redux/cart/cart-actions";

export default function CheckoutPayment() {
  const location = useLocation();
  const address = location.state && location.state.payload;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalAmount = useSelector(selectCartTotalAmount);
  const merchant = useSelector(selectMerchant);
  const user = useSelector(selectUser);
  const currency = useSelector(selectCurrency);
  const { cart } = useSelector(selectCart);
  const dispatch = useDispatch();

  const placeOrder = async (response) => {
    let payload = {
      status: "paid",
      orderId: `${response.tx_ref}`,
      userId: user && user.userId,
      merchantId: merchant && merchant.userId,
      dispatcherId: merchant && merchant.dispatcherId,
      address: address,
      order: cart,
      totalAmount: totalAmount,
      currency: currency,
      ...splitPayment(totalAmount, merchant.deliveryFee || 0),
    };
    try {
      const res = await placeCheckoutOrder(payload);
      setShow(true);
      setLoading(false);
      if (res.err) {
        setError(res.err ? res.err.toString() : "Something went wrong");
      } else {
        setOrderId(`${response.tx_ref}`);
        dispatch(clearCart());
        setStatus("success");
      }
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <div>
      {show ? (
        status === "success" ? (
          <Dialog
            state="success"
            title="Your order was successful"
            message={`
              Your order "#${orderId}" was successfully placed
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
        <div className="relative h-screen w-full">
          <div className="hidden sm:block w-1/2 h-full">
            <div
              className="h-full bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: `url(${storeImg})` }}
            ></div>
          </div>
          <CardPayment
            label="Checkout"
            note="Complete your order"
            amount={totalAmount}
            currency={currency}
            loading={loading}
            onPaymentFailed={(response) => {
              setShow(true);
              setStatus("failed");
              setError(
                response.toString() ||
                  response.message ||
                  "Could not complete transaction, Try again"
              );
            }}
            onPaymentSuccess={(response) => {
              setLoading(true);
              placeOrder(response);
            }}
          />
        </div>
      )}
    </div>
  );
}
