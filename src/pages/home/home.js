import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { getProducts } from "../../redux/product/product-actions";
import { selectProduct } from "../../redux/product/product-slice";

// new products would use camelCase
// pipe the products through cart products to get the quantity
function Home() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  useEffect(() => {
    // just get products once okayy
    if (!product.products) {
      dispatch(getProducts());
    }
  }, []);
  return (
    <div style={{ marginTop: "40px" }}>
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
                  // history.push(`/product/${product.productId}`, product);
                  history.push(`/product/${product.product_id}`, {
                    product: product,
                  });
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
