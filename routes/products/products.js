const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body } = require("express-validator");
const jsonParser = require("../../helpers/jsonParser");
const Category = require("../../models/Category");
const Products = require("../../models/Products");

const {
  createProduct,
  updateProduct,
} = require("../../controllers/products");

router.post(
  "/create",
  jsonParser,
  [
    body("data.categoryId").notEmpty().isUUID(),
    body("data.productName").notEmpty()
      .custom((value, { req }) => {
        return Products.findOne({
          where: {
            product: value,
          },
        }).then((product) => {
          if (product) {
            return Promise.reject("Product name already exists!");
          }
        });
      }),
    body("data.price").notEmpty(),
    body("data.description").notEmpty(),
    body("data.ratingsId").optional(),
    body("data.stocks").notEmpty(),
    body("data.purchaseCount").notEmpty(),
    body("data.status").optional(),
  ],
  validation,
  createProduct
);


  router.post(
    "/:productId/update",
    jsonParser,
    [
      body("data.categoryId").optional().isUUID(),
      body("data.productName").optional()
      .custom((value, { req }) => {
        return Products.findOne({
          where: {
            id: value,
          },
        }).then((product) => {
          if (product) {
            return Promise.reject("Product name already exists!");
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
    updateProduct
  );

  module.exports = router;