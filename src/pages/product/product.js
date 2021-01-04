import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProductById } from "../../api/firebase";
import { history } from "../../App";
import { NavigationBar, Spacer } from "../../components";
import { getLastPathname } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { addItemToCart, cartPipeline } from "../../redux/cart/cart-actions";
import { selectCart, selectCartTotal } from "../../redux/cart/cart-slice";

// new products would use camelCase
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
      <Spacer top="50px" />
      <center>{cart.isLoading && `${cart.message}`}</center>
      <center>
        {!product.shop && loading && <center>Loading Product</center>}
        {product && !product.shop && error && (
          <center>
            Something went wrong, It's not you, it's us, Try again
          </center>
        )}
        {product && product.shop && !loading && (
          <div
            style={{
              border: "1px solid grey",
              maxWidth: "400px",
            }}
          >
            <center style={{ fontWeight: "bold" }}>{product.title}</center>
            {/* <center>NGN {product.priceNgn}</center> */}
            <center>NGN {product.price_ngn}</center>
            <center>{product.description}</center>
            <center style={{ color: "green" }}>
              {/* {product.quantitiesAvailable} in stock */}
              {product.quantities_available} in stock
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
                onClick={() => handleProductQuantity("remove")}
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
                {product.quantity}
              </span>
              <span
                onClick={() => handleProductQuantity("add")}
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
                  if (product.quantity > 0)
                    dispatch(addItemToCart(product, cart.cart));
                }}
                style={{ backgroundColor: "slateblue", color: "white" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </center>
    </div>
  );
}

export default Product;
