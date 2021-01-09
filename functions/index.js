const functions = require("firebase-functions");
const payment = require("./payment");
const shop = require("./shop");
const admin = require("firebase-admin");
admin.initializeApp();

exports.initPayment = payment.initPayment;
exports.validatePayment = payment.validatePayment;
exports.createShop = shop.createShop;
exports.updateShop = shop.updateShop;
