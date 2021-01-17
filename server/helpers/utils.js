const fetch = require("node-fetch");
const admin = require("firebase-admin");

const sendHttpRequest = async (method, endpoint, data, header) => {
  let headers = { ...header };
  try {
    if (method === "GET" || method === "DELETE") {
      const response = await fetch(`${endpoint}`, {
        method: method,
        headers: headers,
      });
      return await response.json();
    }
    const response = await fetch(`${endpoint}`, {
      method: method,
      body: data,
      headers: headers,
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

const post = async (endpoint, data, header) =>
  await sendHttpRequest("POST", endpoint, data, header);
const get = async (endpoint, header) =>
  await sendHttpRequest("GET", endpoint, null, header);

const getRandomIndex = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

// this function splits the (payment and delivery amount) of an order into 4
// 97.5% of the payment amount goes to the shop
// 2.5% of the payment amount goes to JUMGA
// 75% of the delivery fee goes to the dispatcher
// 25% of the delivery fee goes to JUMGA
const splitPayment = (total, deliveryFee) => {
  const merchantAmount = (total * 0.975).toFixed(2);
  const dispatcherAmount = (deliveryFee * 0.8).toFixed(2);
  const jAmount = (total * 0.025).toFixed(2); // jumga amount
  const jAmountForDelivery = (deliveryFee * 0.2).toFixed(2); // jumga amount from delivery fee
  return { merchantAmount, dispatcherAmount, jAmount, jAmountForDelivery };
};

module.exports = { post, get, splitPayment, getRandomIndex };
