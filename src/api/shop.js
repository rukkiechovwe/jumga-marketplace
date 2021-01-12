import { getRandomIndex } from "../helpers/";
import { post } from "./api";
import { db } from "./firebase";
import firebase from "../firebase-config";

export const createPendingShop = async (payload) => {
  try {
    const shop = payload;
    const dispatchers = await (
      await db.collection("dispatchers").get()
    ).docs.map((disp) => disp.data());
    const picked = dispatchers[getRandomIndex(dispatchers.length - 1)];
    shop.dispatcherId = picked.userId;
    // prevent/overwrite injection from frontend
    shop.status = "pending";
    await db
      .collection("users")
      .doc(shop.userId)
      .update({ shopId: shop.shopId, isMerchant: true });
    await db.collection("shops").doc(shop.shopId).set(shop);
    shop.dispatcher = picked;
    return { status: "created", shop: shop };
  } catch (error) {
    return { err: error };
  }
  // try {
  //   const res = await post("/createShop", payload);
  //   if (res.status === "error") return { err: res.message ?? res.status };
  //   return res;
  // } catch (error) {
  //   return { err: error };
  // }
};

export const updatePendingShop = async (payload) => {
  try {
    let { shopId, dispatcherId } = payload;
    await db.collection("shops").doc(shopId).update({ status: "approved" });
    await db
      .collection("dispatchers")
      .doc(dispatcherId)
      .update({ shopIds: [shopId] });
    return { status: "success" };
  } catch (error) {
    return { err: error };
  }
  // try {
  //   const res = await post("/updateShop",  payload);
  //   if (res.status === "error") return { err: res.message };
  //   return res;
  // } catch (error) {
  //   return { err: error };
  // }
};
export const placeCheckoutOrder = async (payload) => {
  try {
    // let { shopId, dispatcherId } = payload;
    // await db.collection("shops").doc(shopId).update({ status: "approved" });
    // await db
    //   .collection("dispatchers")
    //   .doc(dispatcherId)
    //   .update({ shopIds: [shopId] });
    return { status: "success" };
  } catch (error) {
    return { err: error };
  }
  // try {
  //   const res = await post("/placeOrder",  payload);
  //   if (res.status === "error") return { err: res.message };
  //   return res;
  // } catch (error) {
  //   return { err: error };
  // }
};
