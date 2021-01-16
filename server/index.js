var express = require("express");
var cors = require("cors");
var admin = require("firebase-admin");
var fbAdmin = require("./fb-admin.json"); // service account
const flw = require("./flw");
const shop = require("./shop");
admin.initializeApp({
  credential: admin.credential.cert(fbAdmin),
});

var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

router.get("/", function (req, res) {
  res.json({ message: "hOORAY! YOU'VE HACKED US" });
});
router.get("/init-payment", flw.initPayment);
router.get("/verify-payment", flw.validatePayment);
router.get("/create-shop", shop.createShop);
router.get("/update-shop", shop.updateShop);
app.use(cors());
app.use("/api", router);
app.listen(port);
