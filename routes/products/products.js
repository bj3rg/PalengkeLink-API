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
const errorHandler = require("../../util/errorHandler");
const { updateCategory } = require("../../controllers/category");

router.post(
  "/create",
  jsonParser,
  [
    body("data.categoryId").notEmpty()
    .custom((value, { req }) => {
      return Category.findOne({
        where: {
          id: value,
        },
      }).then((category) => {
        if (!category) {
          return Promise.reject("Category ID does not exists!");
        }
      });
    }),
    body("data.productName").notEmpty()
    .custom((value, { req }) => {
      return Products.findOne({
        where: {
          product_name: value,
        },
      }).then((product) => {
        if (product) {
          return Promise.reject("Product already exists!");
        }
      });
    }),
    body("data.price").notEmpty(),
    body("data.description").notEmpty(),
    body("data.ratingsId").optional(),
    body("data.stocks").notEmpty(),
    body("data.purchaseCount").notEmpty(),
  ],
  validation,
  createProduct
);

router.post(
  "/:productId/update",
  jsonParser,
  [
    body("data.categoryId").optional()
    .custom((value, { req }) => {
      return Category.findOne({
        where: {
          id: value,
        },
      }).then((category) => {
        if (!category) {
          return Promise.reject("Category ID does not exists!");
        }
      });
    }),
    body("data.productName").optional()
    .custom((value, { req }) => {
      return Products.findOne({
        where: {
          product_name: value,
        },
      }).then((product) => {
        if (product) {
          return Promise.reject("Product already exists!");
        }
      });
    }),
    body("data.price").optional(),
    body("data.description").optional(),
    body("data.ratingsId").optional(),
    body("data.stocks").optional(),
    body("data.purchaseCount").optional(),
  ],
  validation,
  // updateProduct
);

module.exports = router;
