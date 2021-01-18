import { v4 as uuidv4 } from "uuid";
var forge = require("node-forge");
export const uuid = () => uuidv4();

export function setItem(key, value, storage = "local") {
  if (storage === "local") {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
}
export function getItem(key, storage = "local") {
  if (storage === "local") return JSON.parse(window.localStorage.getItem(key));
  return JSON.parse(window.sessionStorage.getItem(key));
}
export function removeItem(key, storage = "local") {
  if (storage === "local") {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.removeItem(key);
  }
}
export function clearLocalStorage(storage = "local") {
  if (storage === "local") {
    window.localStorage.clear();
  } else {
    window.sessionStorage.clear();
  }
}

export function getReference() {
  var date = Date.now();
  return `${date.toString().substring(0, 9)}`;
}

export const getPng = (name) => {
  return require(`../assets/images/${name}.png`);
};

export const getUrlParam = (param) => {
  return new URLSearchParams(window.location.search).get(param) || "/";
};

export const getLastPathname = (pathname) => {
  const pathList = pathname.split("/");
  return pathList[pathList.length - 1];
};
export const getSlug = (payload) => {
  if (payload) {
    let ls = payload.split(" ");
    ls = ls.map((item) => item.toLowerCase());
    return ls && ls.join("-");
  }
  return null;
};

export const getRandomIndex = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

export const getFileSize = (number) => {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
};

export const encrypt = (payload) => {
  var cipher = forge.cipher.createCipher(
    "3DES-ECB",
    forge.util.createBuffer(process.env.REACT_APP_ENCRYPTION_KEY)
  );
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(JSON.stringify(payload), "utf-8"));
  cipher.finish();
  var encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
};

export function formatToNumber(value) {
  return new Intl.NumberFormat().format(value);
}

// this function splits the (payment and delivery amount) of an order into 4
// 97.5% of the payment amount goes to the shop
// 2.5% of the payment amount goes to JUMGA
// 75% of the delivery fee goes to the dispatcher
// 25% of the delivery fee goes to JUMGA
export function splitPayment(total, deliveryFee) {
  const merchantAmount = parseFloat((total * 0.975).toFixed(2));
  const dispatcherAmount = parseFloat((deliveryFee * 0.8).toFixed(2));
  const jAmount = parseFloat((total * 0.025).toFixed(2)); // jumga amount
  const jAmountForDelivery = parseFloat((deliveryFee * 0.2).toFixed(2)); // jumga amount from delivery fee
  return { merchantAmount, dispatcherAmount, jAmount, jAmountForDelivery };
}

export function getPriceInXCurrency(currency, product) {
  let price = { currency, amount: product.priceNGN }; // defaults to NGN
  switch (currency) {
    case "GHS":
      price.currency = "GHS";
      price.amount = product.priceGHS;
      break;
    case "KES":
      price.currency = "KES";
      price.amount = product.priceKES;
      break;
    case "EUR":
      price.currency = "EUR";
      price.amount = product.priceEUR;
      break;
    default:
  }
  return price;
}
