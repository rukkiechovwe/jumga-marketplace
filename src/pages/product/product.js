import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProductById } from "../../api/firebase";
import { Error, Loading, NavigationBar } from "../../components";
import { getLastPathname } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { addItemToCart, cartPipeline } from "../../redux/cart/cart-actions";
import { selectCart, selectCartTotal } from "../../redux/cart/cart-slice";

function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const total = useSelector(selectCartTotal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true);
    setError(false);
    const product = await fetchProductById(getLastPathname(location.pathname));
    if (product.err) {
      setError(true);
    } else {
      // pipe through cart list to get quantity
      setProduct(cartPipeline(cart.cart, product));
    }
    setLoading(false);
  };

  const handleProductQuantity = (action) => {
    switch (action) {
      case "add":
        if (product.quantity < product.quantities_available) {
          let p = { ...product };
          p.quantity++;
          setProduct(p);
        }
        break;
      case "remove":
        if (product.quantity > 0) {
          let p = { ...product };
          p.quantity--;
          setProduct(p);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <NavigationBar user={user} totalInCart={total} />
      <center>{cart.isLoading && `${cart.message}`}</center>
      {!product.shop && loading && <Loading />}
      {product && !product.shop && error && (
        <Error message="Something went wrong, it's not you, it's us." />
      )}
      {product && !error && !loading && (
        <div className="h-full md:h-screen w-full">
          <div className="h-full w-full flex flex-col md:flex-row items-start overflow-auto">
            <div className="h-full flex items-center justify-center w-full md:w-1/2 py-8 px-4">
              <img className="w-1/2" src={product.images} alt={product.title} />
            </div>
            <div className="w-full md:w-1/2 h-full bg-gray-800 text-white text-left">
              <div className="p-9 w-full h-full flex flex-col justify-center">
                <p className="text-3xl font-semibold py-3">{product.title}</p>
                <div className="flex items-center w-full py-3 justify-between">
                  <p className="text-xl font-medium">NGN {product.price_ngn}</p>
                  <p className="bg-green-400 px-2 text-white rounded-full py-1">
                    {product.quantities_available} in stock
                  </p>
                </div>
                <div className="py-3 flex items-start flex-col">
                  <p className="pb-0.5 mb-1.5 font-semibold border-solid border-b-2 border-green-400">
                    DESCRIPTION
                  </p>
                  <p className="text-grey">{product.description}</p>
                </div>
                <div className="flex items-center justify-center bg-black rounded-full p-1 my-3 w-24">
                  <span
                    className="font-bold cursor-pointer px-2"
                    onClick={() => handleProductQuantity("remove")}
                  >
                    -
                  </span>
                  <span className="font-bold px-2">{product.quantity}</span>
                  <span
                    onClick={() => handleProductQuantity("add")}
                    className="font-bold cursor-pointer px-2"
                  >
                    +
                  </span>
                </div>

                <div>
                  <button
                    onClick={() => {
                      if (product.quantity > 0)
                        dispatch(addItemToCart(product, cart.cart));
                    }}
                    className="border-solid bg-green-400 w-full rounded-full py-1.5 my-1.5"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
