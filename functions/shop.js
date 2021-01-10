const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getRandomIndex } = require("./helpers/utils");

exports.createShop = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    let shop = req.body;
    const dispatchers = await (
      await admin.firestore().collection("dispatchers").get()
    ).docs.map((disp) => disp.data());
    const picked = dispatchers[getRandomIndex(dispatchers.length - 1)];
    shop.dispatcherId = picked.userId;
    // prevent/overwrite injection from frontend
    shop.status = "pending";
    await admin
      .firestore()
      .collection("users")
      .doc(shop.userId)
      .update({ shopId: shop.shopId });
    await admin.firestore().collection("shops").doc(shop.shopId).set(shop);
    shop.dispatcher = picked;
    res.status(201).send({ status: "created", shop: shop });
  } catch (error) {
    res.status(500).send({ err: error });
  }
});

exports.updateShop = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    let { shopId, dispatcherId } = req.body;
    await admin
      .firestore()
      .collection("shops")
      .doc(shopId)
      .update({ status: "approved" });
    await admin
      .firestore()
      .collection("dispatchers")
      .doc(dispatcherId)
      .update({ shopIds: admin.firestore.FieldValue.arrayUnion(shopId) });
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ err: error });
  }
});
