import { addToCart, removeFromCart } from "./cart-slice";

export const cartPipeline = (cart, product) => {
  let _product;
  cart.forEach((item) => {
    if (item.productId === product.productId) {
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
    if (_item.productId === item.productId) {
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
  const _cart = cart.filter((_item) => item.productId !== _item.productId);
  dispatch(removeFromCart(_cart));
};
export const clearCart = () => async (dispatch) => {
  dispatch(removeFromCart([]));
};
