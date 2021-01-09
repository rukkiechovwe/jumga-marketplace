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

module.exports = { post, get, getRandomIndex };
