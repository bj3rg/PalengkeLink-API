const express = require("express");
const router = express.Router();

const productsRoute = require("./products/products");
const userRoute = require("./user/user");
const categoryRoute = require("./category/category");


router.use("/products", productsRoute);
router.use("/user", userRoute);
router.use("/category", categoryRoute);

module.exports = router;
