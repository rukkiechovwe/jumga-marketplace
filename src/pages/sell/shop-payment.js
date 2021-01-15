import { useState } from "react";
import { useLocation } from "react-router-dom";
import { updatePendingShop } from "../../api/shop";
import { history } from "../../App";
import paymentImg from "../../assets/images/paymentImg.jpg";
import { CardPayment, Dialog, Error } from "../../components";
import "../../bg-color.css";

export default function ShopPayment() {
  const location = useLocation();
  const shop = location.state && location.state.payload;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateShop = async () => {
    let payload = { shopId: shop.shopId, dispatcherId: shop.dispatcherId };
    try {
      const res = await updatePendingShop(payload);
      setShow(true);
      setLoading(false);
      if (res.err) {
        setError(res.err ? res.err : "Something went wrong");
      } else {
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
            title="Payment successful"
            message={`
              Your shop "${shop.title}" was successfully created, You've been
              assigned "${shop.dispatcher.fullname} (${shop.dispatcher.phoneNumber})" as your dispatch rider.\n
              You can start selling by adding products to your shop.
            `}
            callbackText="Start selling"
            callback={() => {
              history.replace("/account/dashboard/products/add-product");
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
      {!shop && <Error mt="0" />}
      {shop && (
        <div className="relative h-screen w-full">
          <div className="hidden sm:block w-1/2 h-full">
            <div
              className="h-full bg-no-repeat bg-cover bg-img"
              style={{ backgroundImage: `url(${paymentImg})` }}
            ></div>
            {/* this one or we look for something else i lie that girl, i'm right here ohh lolll, we use the girl then, okayyys
            can we use it as banner also, ?okayyyy, let's use it for login first okayy
            */}
          </div>
          <CardPayment
            label="Create Store"
            note="You'll be charged a token of $20 to create a store"
            amount={20}
            currency="USD"
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
              updateShop(response);
            }}
          />
        </div>
      )}
    </div>
  );
}
