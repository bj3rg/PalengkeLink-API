const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body } = require("express-validator");
const jsonParser = require("../../helpers/jsonParser");
const Category = require("../../models/Category");
const Products = require("../../models/Products");
const deleteFile = require("../../helpers/deleteFile");

const {
  createProduct,
  // updateProduct,
  // findProductsByCategory,
  // findActiveProductsByCategory
} = require("../../controllers/products");

router.post(
  "/create",
  jsonParser,
  [
    body("data.categoryId").notEmpty(),
    body("data.productName").notEmpty(),
    body("data.price").notEmpty,
    body("data.description").notEmpty(),
    body("data.ratingsId").optional(),
    body("data.stocks").notEmpty(),
    body("data.purchaseCount").notEmpty(),
  ],
  validation,
  createProduct
);

module.exports = router;
