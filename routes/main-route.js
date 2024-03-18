const express = require("express");
const router = express.Router();

const productsRoute = require("./products/products");

router.use("/products", productsRoute);

module.exports = router;