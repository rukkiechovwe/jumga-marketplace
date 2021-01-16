import firebase from "../firebase-config";

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
      .where("shop_id", "==", shopId)
      // .where("shopId", "==", shopId)
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

// STORAGE API
export const uploadFile = async (file, folder) => {
  try {
    let filename = `${folder}/${file.name}`;
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
