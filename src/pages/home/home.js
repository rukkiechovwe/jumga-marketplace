import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { NavigationBar, Spacer } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";
import { getProducts } from "../../redux/product/product-actions";
import { selectProduct } from "../../redux/product/product-slice";

// new products would use camelCase
// pipe the products through cart products to get the quantity
function Home() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    // just get products once okayy
    if (!product.products) {
      dispatch(getProducts());
    }
  }, []);
  return (
    <div>
      <NavigationBar user={user} totalInCart={total} />
      <Spacer top="50px" />
      {product.isLoading && <center>LOADING...</center>}
      {product.error && (
        <center style={{ color: "red" }}>{product.message}</center>
      )}
      {product.products &&
        product.products.map((product) => {
          return (
            <center key={product.product_id}>
              <div
                onClick={() => {
                  // history.push(`/product/${product.productId}`);
                  history.push(`/product/${product.product_id}`);
                }}
                style={{
                  border: "1px solid grey",
                  maxWidth: "400px",
                  margin: "10px",
                  cursor: "pointer",
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
              </div>
            </center>
          );
        })}
    </div>
  );
}

export default Home;
