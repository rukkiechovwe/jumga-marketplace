const express = require("express");
const admin = require("firebase-admin");
const firebase = require("./fb-admin.json"); // firebase service account
const flw = require("./flw");
const shop = require("./shop");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert(firebase),
});

const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

router.post("/init-payment", flw.initPayment);
router.post("/validate-payment", flw.validatePayment);
router.post("/exchange-rate", flw.getExchangeRate);
router.post("/create-shop", shop.createShop);
router.post("/update-shop", shop.updateShop);
app.use("/api", router);
app.listen(port);
