import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { history } from "../../App";
import { getLastPathname } from "../../helpers/utils";
import { addItemToCart } from "../../redux/cart/cart-actions";
import { selectCart } from "../../redux/cart/cart-slice";
import {
  getProductById,
  getProductShop,
} from "../../redux/product/product-actions";

// new products would use camelCase
function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector(selectCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(
    location.state && location.state.product
  );
  useEffect(() => {
    // if product is undefined, get product using id from url
    getProduct();
  }, []);
  const getProduct = async () => {
    setLoading(true);
    if (product) {
      // getProductShop(product.shopId);
      const productShop = await getProductShop(product.shop_id);
      if (productShop.err) {
        setError(true);
      } else {
        let p = { ...product, shop: productShop.shop };
        setProduct(p);
      }
    } else {
      const product = await getProductById(getLastPathname(location.pathname));
      if (product.err) {
        setError(true);
      } else {
        const productShop = await getProductShop(product.shop_id);
        if (productShop.err) {
          setError(true);
        } else {
          let p = { ...product, shop: productShop.shop };
          setProduct(p);
        }
      }
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
    <div style={{ marginTop: "40px" }}>
      <center>{cart.isLoading && `${cart.message}`}</center>
      <center>
        {loading && <center>Loading Product</center>}
        {error && (
          <center>
            Something went wrong, It's not you, it's us, Try again
          </center>
        )}
        {product && (
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
