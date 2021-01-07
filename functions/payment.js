const functions = require("firebase-functions");
const { FLW_URL } = require("./helpers/CONSTANTS");
const { post } = require("./helpers/utils");
require("dotenv").config();
exports.initPayment = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const data = req.body;
    const flwRes = await post(`${FLW_URL}/charges?type=card`, data, {
      Authorization: `Bearer ${process.env.FLW_SK}`,
    });
    res
      .status(200)
      .send({ payload: data, res: flwRes, message: flwRes.message });
  } catch (error) {
    res.status(500).send({ err: error });
  }
});
