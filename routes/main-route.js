const express = require("express");
const router = express.Router();

const productsRoute = require("./products/products");
const userRoute = require("./user/user");
const categoryRoute = require("./category/category");
const accountRoute = require("./account/account");
const orderRoute = require("./order/order");
const voucherRoute = require("./voucher/voucher");
const blogRoute = require("./blog/blog");
const transactionRoute = require("./transactions/transactions");

router.use("/products", productsRoute);
router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/category", categoryRoute);
router.use("/account", accountRoute);
router.use("/voucher", voucherRoute);
router.use("/blog", blogRoute);
router.use("/transaction", transactionRoute);

module.exports = router;
