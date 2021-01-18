const { FLW_URL } = require("./helpers/CONSTANTS");
const { post, get } = require("./helpers/utils");
require("dotenv").config();

exports.initPayment = async (req, res) => {
  try {
    const payload = req.body;
    const flwRes = await post(
      `${FLW_URL}/charges?type=card`,
      JSON.stringify(payload),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLW_SK}`,
      }
    );
    res.status(200).send(flwRes);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

exports.validatePayment = async (req, res) => {
  try {
    const payload = req.body;
    const flwRes = await post(
      `${FLW_URL}/validate-charge`,
      JSON.stringify(payload),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLW_SK}`,
      }
    );
    res.status(200).send(flwRes);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

exports.getExchangeRate = async (req, res) => {
  try {
    const { to, from, amount } = req.body;
    let prices = { [`price${from}`]: parseFloat(amount) };
    for (const currency of to) {
      const flwRes = await get(
        `${FLW_URL}/rates?from=${from}&to=${currency}&amount=${amount}`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLW_SK}`,
        }
      );
      if (flwRes.status === "success") {
        prices[`price${currency}`] = flwRes.data && flwRes.data.to.amount;
      } else {
        res
          .status(500)
          .send({ err: flwRes.message || "Error getting exchange rates" });
        break;
      }
    }
    res.status(200).send({ status: "success", data: prices });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
