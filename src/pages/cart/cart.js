import { useDispatch, useSelector } from "react-redux";
import { NavigationBar, Spacer } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../redux/cart/cart-actions";
import {
  selectCart,
  selectCartTotal,
  selectCartTotalAmount,
} from "../../redux/cart/cart-slice";

function Cart() {
  const total = useSelector(selectCartTotal);
  const totalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  return (
    <div>
      <NavigationBar user={user} totalInCart={total} />
      <Spacer top="50px" />
      <p>
        <center>CART ( {total} items )</center>
      </p>
      {cart.cart.length === 0 && (
        <p>
          <center>Cart is empty</center>
        </p>
      )}
      {cart.cart &&
        cart.cart.map((item) => {
          return (
            <center>
              <div
                style={{
                  border: "1px solid grey",
                  maxWidth: "400px",
                  marginTop: "10px",
                }}
              >
                <center
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </center>
                <center>Unit price: NGN {item.price_ngn}</center>
                <center>
                  Subtotal: NGN {(item.price_ngn * item.quantity).toFixed(2)}
                </center>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    onClick={() => {
                      if (item.quantity > 1) {
                        let _item = { ...item, quantity: item.quantity - 1 };
                        dispatch(addItemToCart(_item, cart.cart));
                      }
                    }}
                    style={{
                      fontWeight: "bolder",
                      margin: "8px",
                      cursor: "pointer",
                      padding: "8px",
                    }}
                  >
                    -
                  </span>
                  <span
                    style={{
                      fontWeight: "bolder",
                      margin: "8px",
                      fontSize: "16px",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <span
                    onClick={() => {
                      if (item.quantity < item.quantities_available) {
                        let _item = { ...item, quantity: item.quantity + 1 };
                        dispatch(addItemToCart(_item, cart.cart));
                      }
                    }}
                    style={{
                      fontWeight: "bolder",
                      margin: "8px",
                      cursor: "pointer",
                      padding: "8px",
                    }}
                  >
                    +
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      dispatch(removeItemFromCart(item, cart.cart));
                    }}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      marginBottom: "8px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </center>
          );
        })}
      {cart.cart && (
        <p>
          <center>Total: NGN {totalAmount}</center>
        </p>
      )}
    </div>
  );
}

export default Cart;
