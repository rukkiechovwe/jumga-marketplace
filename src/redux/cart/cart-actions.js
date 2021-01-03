import { user } from "../../api/firebase";
import { addToCart, cartActionStarted, removeFromCart } from "./cart-slice";

// const URL = "https://fakestoreapi.com/products";

export const addItemToCart = (item, cart) => async (dispatch) => {
  dispatch(cartActionStarted("Adding item to cart"));
  console.log(user, "user");
  if (user) {
    // const res = await addItemToUserCart(item)
  }
  const newCart = cart.concat(item);
  dispatch(addToCart(newCart));
};
export const removeItemFromCart = (item, cart) => async (dispatch) => {
  dispatch(cartActionStarted("Removing item from cart"));
  const newCart = cart.filter((c) => item.id !== c.id);
  dispatch(removeFromCart(newCart));
};
