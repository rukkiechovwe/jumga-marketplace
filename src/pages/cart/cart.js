import { useDispatch, useSelector } from "react-redux";
import { NavigationBar } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import emptySvg from "../../assets/images/empty.svg";
import { history } from "../../App";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../redux/cart/cart-actions";
import {
  selectCart,
  selectCartTotal,
  selectCartTotalAmount,
} from "../../redux/cart/cart-slice";
import { getNextRoute, selectCurrency } from "../../redux/app/app-slice";
import {
  formatToNumber,
  getFeeInXCurrency,
  getPriceInXCurrency,
} from "../../helpers";
import { useLocation } from "react-router-dom";

const DELIVERY_FEE = {
  NGN: 2000,
  EUR: 4.34,
  KES: 577.75,
  GHS: 30.59,
};

export default function Cart() {
  const location = useLocation();
  const total = useSelector(selectCartTotal);
  const currency = useSelector(selectCurrency);
  const user = useSelector(selectUser);
  const { cart } = useSelector(selectCart);
  const totalAmount = useSelector((state) =>
    selectCartTotalAmount(state, currency)
  );
  const dispatch = useDispatch();
  const fee = getFeeInXCurrency(currency, DELIVERY_FEE);
  return (
    <div className="h-full md:h-screen ">
      <NavigationBar user={user} totalInCart={total} />
      <div className="flex flex-col justify-center items-center mt-4">
        {cart.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center mt-20">
            <img src={emptySvg} className="object-contain h-80 w-80" />
            <p className="w-full text-center text-lg">Your cart is empty!</p>
            <button
              type="button"
              onClick={() => {
                history.replace("/");
              }}
              className="w-auto inline-flex justify-center rounded-lg border border-transparent shadow-lg mt-4 px-4 py-2 bg-green-400 text-base text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:text-sm"
            >
              START SHOPPING
            </button>
          </div>
        ) : (
          cart.map((item) => {
            let price = getPriceInXCurrency(currency, item);
            return (
              <div className="w-full md:w-1/2 m-1 flex items-center ">
                <div className="w-full mx-4 md:mx-0 p-0 phn:p-2 flex flex-row items-center justify-between bg-white rounded-md">
                  <div className="flex items-center w-full">
                    <img
                      className="w-20 p-2 object-contain"
                      src={item.productImage}
                      alt={item.title}
                    />
                    <div>
                      <p
                        className="p-1 w-full phn:w-5/6 text-gray-600 cursor-pointer hover:text-green-400"
                        onClick={() => {
                          history.push(
                            `/vendors/${item.shopId}/products/${item.productId}`
                          );
                        }}
                      >
                        {item.title}
                      </p>
                      <span className="p-1 text-sm font-medium text-black">
                        {item.quantity} x {currency}{" "}
                        {formatToNumber(price.amount.toFixed(2))}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(removeItemFromCart(item, cart));
                    }}
                    className="px-1 mr-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="text-red-600 h-5 w-5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  {/* sorry,lalalalalala, not here, where's it tho??
                  won't it be better to make it lighter instead, idg, show me instead of turning it white */}
                  {/* item price and increse quantity */}
                  {/* <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start justify-center p-2 text-sm">
                      <p className="font-semibold uppercase text-gray-400">
                        Unit price
                      </p>
                      <p>NGN {item.price_ngn}</p>
                    </div>
                    {/* increase quantity */}
                  {/* <div className="flex items-center justify-center p-2">
                      <span className="font-semibold">{item.quantity}</span>
                      <div className="flex flex-col items-center justify-center pl-1.5 py-1">
                        <span
                          onClick={() => {
                            if (item.quantity > 1) {
                              let _item = {
                                ...item,
                                quantity: item.quantity - 1,
                              };
                              dispatch(addItemToCart(_item, cart));
                            }
                          }}
                          className="font-semibold mb-1 cursor-pointer"
                        >
                          <img src={removeIcon} alt="add" />
                        </span>
                        <span */}
                  {/* onClick={() => {
                            if (item.quantity < item.quantities_available) {
                              let _item = {
                                ...item,
                                quantity: item.quantity + 1,
                              };
                              dispatch(addItemToCart(_item, cart));
                            }
                          }}
                          className="font-semibold mt-1 cursor-pointer"
                        >
                          <img src={addIcon} alt="add" />
                        </span>
                      </div>
                    </div> */}
                  {/* increase quantity and item price */}
                  {/* <div className="flex flex-col items-start justify-center p-2 text-sm">
                      <p className="font-semibold uppercase text-gray-400">
                        Subtotal
                      </p>
                      <p> NGN {(item.price_ngn * item.quantity).toFixed(2)}</p>
                    </div>
                  </div> */}
                  {/* item rice and increse quantity */}
                </div>
                {/* nice */}
              </div>
            );
          })
        )}
        {cart.length !== 0 && (
          <>
            <div className="w-full md:w-1/2 mt-4 flex flex-row items-center justify-end">
              <div className="flex flex-col items-end">
                <span className="text-black text-lg mx-4">
                  {currency}{" "}
                  {`${formatToNumber(parseFloat(totalAmount) + fee.amount)}`}
                </span>
                <span className="text-gray-500 text-sm mx-4">
                  Delivery fee included ({" "}
                  {`${fee.currency} ${formatToNumber(fee.amount)}`} )
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 flex flex-row items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    history.push("/checkout/address?step=1");
                  } else {
                    dispatch(getNextRoute(location.pathname));
                    history.push(`/login?from=${location.pathname}`);
                  }
                }}
                className="w-60 md:w-auto rounded-md border border-transparent shadow-sm mt-2 mx-3 md:mx-0 px-4 py-2 bg-green-400 text-base font-medium text-white  hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:text-sm"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
