const { FLW_URL } = require("./helpers/CONSTANTS");
const { post } = require("./helpers/utils");
require("dotenv").config();

exports.initPayment = async (req, res) => {
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
};

exports.validatePayment = async (req, res) => {
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
};

exports.getExchangeRate = async (req, res) => {
  try {
    const payload = req.body;
    const flwRes = await post(`${FLW_URL}/v3/rates`, payload, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FLW_SK}`,
    });
    //
    res.status(200).send(flwRes);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
