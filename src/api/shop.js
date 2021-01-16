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
    const batch = db.batch();
    batch.update(db.collection("users").doc(shop.userId), {
      shopId: shop.shopId,
      isMerchant: true,
    });
    batch.set(db.collection("shops").doc(shop.shopId), shop);
    await batch.commit();
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
    const dispatcherReference = db.collection("dispatchers").doc(dispatcherId);
    await db.runTransaction((transaction) => {
      return transaction.get(dispatcherReference).then((dispatcher) => {
        if (dispatcher.exists) {
          let shopIds = dispatcher.data().shopIds;
          shopIds.push(shopId);
          transaction.update(dispatcherReference, {
            shopIds,
          });
        }
      });
    });
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
  let {
    orderId,
    currency,
    merchantId,
    dispatcherId,
    totalAmount,
    vendorAmount,
    dispatcherAmount,
    jAmount,
    jAmountForDelivery,
  } = payload;
  try {
    const fsVendorReference = db.collection("users").doc(`${merchantId}`);
    const fsDispatcherReference = db
      .collection("dispatchers")
      .doc(`${dispatcherId}`);
    const fsAdminReference = db.collection("app").doc("admin");
    await db.runTransaction((transaction) => {
      return transaction.get(fsVendorReference).then((fsVendor) => {
        if (fsVendor.exists) {
          let wallet = fsVendor.data().walletBalance;
          let balance = wallet[currency] || 0.0;
          balance = parseFloat((balance + vendorAmount).toFixed(2));
          transaction.update(fsVendorReference, {
            walletBalance: { ...wallet, [currency]: balance },
          });
        }
      });
    });
    await db.runTransaction((transaction) => {
      return transaction.get(fsDispatcherReference).then((fsDispatcher) => {
        if (fsDispatcher.exists) {
          let wallet = fsDispatcher.data().walletBalance;
          let balance = wallet[currency] || 0.0;
          balance = parseFloat((balance + dispatcherAmount).toFixed(2));
          transaction.update(fsDispatcherReference, {
            walletBalance: { ...wallet, [currency]: balance },
          });
        }
      });
    });
    await db.runTransaction((transaction) => {
      return transaction.get(fsAdminReference).then((fsAdmin) => {
        if (fsAdmin.exists) {
          let pWallet = fsAdmin.data().profit; //profit wallet
          let rWallet = fsAdmin.data().revenue; //revenue wallet
          let profit = pWallet[currency] || 0.0;
          let revenue = rWallet[currency] || 0.0;
          revenue = parseFloat((revenue + parseFloat(totalAmount)).toFixed(2));
          profit = parseFloat(
            (profit + jAmount + jAmountForDelivery).toFixed(2)
          );
          transaction.update(fsAdminReference, {
            profit: { ...pWallet, [currency]: profit },
            revenue: { ...rWallet, [currency]: revenue },
          });
        }
      });
    });
    await db.collection("sales").doc(`${orderId}`).set(payload);
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
