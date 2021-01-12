const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.placeOrder = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    let { cart, totalAmount, user, address, shop } = req.body;

    res.status(200).send({ status: "created" });
  } catch (error) {
    res.status(500).send({ err: error });
  }
});
