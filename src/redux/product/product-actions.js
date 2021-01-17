import { fetchProducts, fetchShops } from "../../api";
import {
  getProductsFailed,
  getProductInit,
  getProductsSuccess,
  getShopsFailed,
  getShopsSuccess,
} from "./product-slice";

export const getProducts = (shopId) => async (dispatch) => {
  dispatch(getProductInit());
  const products = await fetchProducts(shopId);
  if (products.err) {
    dispatch(getProductsFailed(products.err.message));
  } else {
    dispatch(getProductsSuccess(products.products));
  }
};
export const getShops = () => async (dispatch) => {
  dispatch(getProductInit());
  const shops = await fetchShops();
  if (shops.err) {
    dispatch(getShopsFailed(shops.err.message));
  } else {
    dispatch(getShopsSuccess(shops.shops));
  }
};
