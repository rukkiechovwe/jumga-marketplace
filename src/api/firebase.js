import firebase from "../firebase-config";
import { getRandomIndex } from "../helpers/";
import { post } from "./api";
import { exchangeRate } from "./flw";

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const user = auth.currentUser;

export const fetchUser = async () => {
  const user = auth.currentUser;
  try {
    if (user !== null) {
      const res = await db.collection("users").doc(user.uid).get();
      return { err: null, user: res.data() };
    } else {
      return { err: { message: "Error" } };
    }
  } catch (e) {
    return { err: e, user: null };
  }
};
export const userLogin = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return await fetchUser();
  } catch (e) {
    return { err: e, user: null };
  }
};

export const userLogout = async () => {
  await auth.signOut();
};

export const createUser = async (user) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    const userModel = {
      email: user.email,
      fullname: user.fullname,
      isMerchant: false,
      userId: res.user.uid,
      walletBalance: { NGN: 0.0, GHS: 0.0, KES: 0.0, EUR: 0.0 },
      cart: [],
      shippingAddress: {},
    };
    await db.collection("users").doc(res.user.uid).set(userModel);
    return { user: userModel };
  } catch (e) {
    // await auth.currentUser.delete();
    return { err: e, user: null };
  }
};

export const passwordReset = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return {};
  } catch (e) {
    return { err: e };
  }
};

// SHOP API
export const fetchShops = async () => {
  try {
    const res = await db
      .collection("shops")
      .where("status", "==", "approved")
      .get();
    const shops = res.docs.map((p) => p.data());
    return { err: null, shops: shops };
  } catch (e) {
    return { err: e };
  }
};

export const fetchShopById = async (id) => {
  try {
    const shop = await (await db.collection("shops").doc(id).get()).data();
    const dispatcher = await (
      await db.collection("dispatchers").doc(shop.shopId).get()
    ).data();
    const shopMd = { ...shop, dispatcher: dispatcher };
    return shopMd;
  } catch (e) {
    return { err: e };
  }
};

//  PRODUCTS API
export const fetchProducts = async (shopId) => {
  try {
    const res = await db
      .collection("products")
      .where("shopId", "==", shopId)
      .get();
    const products = res.docs.map((p) => {
      return { ...p.data(), quantity: 0 };
    });
    return { err: null, products: products };
  } catch (e) {
    return { err: e };
  }
};

export const fetchProductById = async (id) => {
  try {
    const product = await (
      await db.collection("products").doc(id).get()
    ).data();
    const shop = await (
      await db.collection("shops").doc(product.shopId).get()
    ).data();
    const productMd = { ...product, shop: shop || {} };
    return productMd;
  } catch (e) {
    return { err: e };
  }
};

export const addProductToShop = async (payload) => {
  const { productId, price, currency } = payload;
  try {
    const res = await exchangeRate({ from: currency, amount: price });
    if (res.status === "success") {
      let product = { ...payload, ...res.data };
      delete product.price;
      await db.collection("products").doc(productId).set(product);
      return { product, err: null };
    } else {
      return { err: res.err || "Something went wrong" };
    }
  } catch (e) {
    return { err: e };
  }
};

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
    merchantAmount,
    dispatcherAmount,
    jAmount,
    jAmountForDelivery,
  } = payload;
  try {
    const fsMerchantReference = db.collection("users").doc(`${merchantId}`);
    const fsDispatcherReference = db
      .collection("dispatchers")
      .doc(`${dispatcherId}`);
    const fsAdminReference = db.collection("app").doc("admin");
    await db.runTransaction((transaction) => {
      return transaction.get(fsMerchantReference).then((fsMerchant) => {
        if (fsMerchant.exists) {
          let wallet = fsMerchant.data().walletBalance;
          let balance = wallet[currency] || 0.0;
          balance = parseFloat((balance + merchantAmount).toFixed(2));
          transaction.update(fsMerchantReference, {
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

// TODO: limit query
export const fetchDashboard = async (user) => {
  const { userId, shopId, isMerchant } = user;
  try {
    let products, sales;
    if (isMerchant) {
      products = await (
        await db.collection("products").where("shopId", "==", shopId).get()
      ).docs.map((product) => product.data());
      sales = await (
        await db.collection("sales").where("merchantId", "==", userId).get()
      ).docs.map((sale) => sale.data());
    }
    const orders = await (
      await db.collection("sales").where("userId", "==", userId).get()
    ).docs.map((order) => order.data());
    return { products, sales, orders };
  } catch (error) {
    return { err: error };
  }
};

export const fetchDashboardProducts = async (user) => {
  const { shopId, isMerchant } = user;
  try {
    let products;
    if (isMerchant && products) {
      products = await (
        await db.collection("products").where("shopId", "==", shopId).get()
      ).docs.map((product) => product.data());
    }
    return { products };
  } catch (error) {
    return { err: error };
  }
};
// STORAGE API
export const uploadFile = async (file, folder, id) => {
  try {
    let filename = id ? `${folder}/${id}` : `${folder}/${file.name}`;
    filename = filename.replace(/\s/g, "").trim();
    let fileReference = storage.ref().child(filename);
    await fileReference.put(file);
    let url = await fileReference.getDownloadURL();
    return url;
  } catch (e) {
    return { err: e };
  }
};

export const deleteFile = async (filePath) => {
  try {
    let fileRef = storage.ref().child(filePath);
    await fileRef.delete();
    return { err: null };
  } catch (e) {
    return { err: e };
  }
};
