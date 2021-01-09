const functions = require("firebase-functions");
const { FLW_URL } = require("./helpers/CONSTANTS");
const { post } = require("./helpers/utils");
require("dotenv").config();

exports.initPayment = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const payload = req.body;
    const flwRes = await post(`${FLW_URL}/v3/charges?type=card`, payload, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FLW_SK}`,
    });
    res.status(200).send(flwRes);
  } catch (error) {
    res.status(500).send({ err: error });
  }
});

exports.validatePayment = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const payload = req.body;
    const flwRes = await post(`${FLW_URL}/v3/validate-charge`, payload, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FLW_SK}`,
    });
    res.status(200).send(flwRes);
  } catch (error) {
    res.status(500).send({ err: error });
  }
});
