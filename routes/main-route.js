const express = require("express");
const router = express.Router();

const productsRoute = require("./products/products");
const categoryRoute = require("./category/category");

router.use("/products", productsRoute);
router.use("/category", categoryRoute);

module.exports = router;
