import { addToCart, removeFromCart } from "./cart-slice";

// const URL = "https://fakestoreapi.com/products";
export const cartPipeline = (cart, product) => {
  let _product;
  cart.forEach((item) => {
    if (item.product_id === product.product_id) {
      _product = {
        ...product,
        quantity: item.quantity,
      };
    }
  });
  return _product ? _product : { ...product, quantity: 0 };
};

export const addItemToCart = (item, cart) => (dispatch) => {
  let isNewItem = true;
  const _cart = cart.map((_item) => {
    if (_item.product_id === item.product_id) {
      isNewItem = false;
      return {
        ..._item,
        quantity: item.quantity,
      };
    }
    return _item;
  });
  if (isNewItem) {
    const _cart = [...cart, item];
    dispatch(addToCart(_cart));
  } else {
    dispatch(addToCart(_cart));
  }
};

export const removeItemFromCart = (item, cart) => async (dispatch) => {
  const _cart = cart.filter((_item) => item.product_id !== _item.product_id);
  dispatch(removeFromCart(_cart));
};
export const clearCart = () => async (dispatch) => {
  dispatch(removeFromCart([]));
};
