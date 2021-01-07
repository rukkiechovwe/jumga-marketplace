const functions = require("firebase-functions");
const payment = require("./payment");
const admin = require("firebase-admin");
admin.initializeApp();

exports.initPayment = payment.initPayment;
