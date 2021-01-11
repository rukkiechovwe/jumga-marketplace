import { useDispatch, useSelector } from "react-redux";
import { NavigationBar } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import deleteIcon from "../../assets/images/deleteIcon.png";
import addIcon from "../../assets/images/addIcon.png";
import removeIcon from "../../assets/images/removeIcon.png";
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
    <div className="h-full md:h-screen">
      <NavigationBar user={user} totalInCart={total} />
      <div className="w-full flex flex-col md:flex-row overflow-auto">
        <div className="h-full w-full md:w-3/5 p-2">
          <p className="p-2">You have {total} items in cart</p>

          <div>
            {cart.cart.length === 0 && (
              <p>
                <center>Cart is empty</center>
              </p>
            )}
            {cart.cart &&
              cart.cart.map((item) => {
                return (
                  <div className="w-full pb-5 flex items-center">
                    <div className="w-full m-2 flex flex-wrap items-center justify-between bg-white rounded-md shadow-lg">
                      {/* item image and title */}
                      <div className="flex items-center w-full">
                        <img
                          className="w-16 p-2"
                          src={item.images}
                          alt={item.title}
                        />
                        <p className="font-semibold p-2 w-5/6">{item.title}</p>
                      </div>
                      {/* item image and title */}

                      {/* item price and increse quantity */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start justify-center p-2 text-sm">
                          <p className="font-semibold uppercase text-gray-400">
                            Unit price
                          </p>
                          <p>NGN {item.price_ngn}</p>
                        </div>
                        {/* increase quantity */}
                        <div className="flex items-center justify-center p-2">
                          <span className="font-semibold">{item.quantity}</span>
                          <div className="flex flex-col items-center justify-center pl-1.5 py-1">
                            <span
                              onClick={() => {
                                if (item.quantity > 1) {
                                  let _item = {
                                    ...item,
                                    quantity: item.quantity - 1,
                                  };
                                  dispatch(addItemToCart(_item, cart.cart));
                                }
                              }}
                              className="font-semibold mb-1 cursor-pointer"
                            >
                              <img src={removeIcon} alt="add" />
                            </span>
                            <span
                              onClick={() => {
                                if (item.quantity < item.quantities_available) {
                                  let _item = {
                                    ...item,
                                    quantity: item.quantity + 1,
                                  };
                                  dispatch(addItemToCart(_item, cart.cart));
                                }
                              }}
                              className="font-semibold mt-1 cursor-pointer"
                            >
                              <img src={addIcon} alt="add" />
                            </span>
                          </div>
                        </div>
                        {/* increase quantity and item price */}
                        <div className="flex flex-col items-start justify-center p-2 text-sm">
                          <p className="font-semibold uppercase text-gray-400">
                            Subtotal
                          </p>
                          <p>
                            {" "}
                            NGN {(item.price_ngn * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {/* item rice and increse quantity */}
                    </div>
                    <button
                      onClick={() => {
                        dispatch(removeItemFromCart(item, cart.cart));
                      }}
                      className="px-1"
                    >
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </div>
                );
              })}

            {cart.cart && (
              <div className="w-full flex flex-col justify-end items-end py-2 pr-8">
                <p className="font-semibold">Total:</p>
                <p className=" pl-2"> NGN {totalAmount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
