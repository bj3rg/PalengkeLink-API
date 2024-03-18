const express = require("express");
const router = express.Router();

const productsRoute = require("./products/products");
const userRoute = require("./user/user");

router.use("/products", productsRoute);
router.use("/user", userRoute);

module.exports = router;