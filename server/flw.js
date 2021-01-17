const { FLW_URL } = require("./helpers/CONSTANTS");
const { post } = require("./helpers/utils");
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
    let prices = { [`price${from}`]: amount };
    const { to, from, amount } = req.body;
    for (let i = 0; i < to.length; i++) {
      const currency = to[i];
      const flwRes = await post(
        `${FLW_URL}/rates`,
        JSON.stringify({ to: currency, from: from, amount: amount }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLW_SK}`,
        }
      );
      if (flwRes.status === "success") {
        prices[`price${currency}`] = flwRes.data && flwRes.data.to.amount;
      } else {
        res.status(500).send({ err: flwRes });
        break;
      }
    }
    res.status(200).send({ status: "success", data: prices });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
