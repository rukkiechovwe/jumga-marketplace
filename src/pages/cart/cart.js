import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectCart, selectCartLength } from "../../redux/cart/cart-slice";

function Cart() {
  const total = useSelector(selectCartLength);
  const cart = useSelector(selectCart);
  return (
    <div>
      <p>CART ( {total} items )</p>
    </div>
  );
}

export default withRouter(Cart);
