const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator")

const {createProduct} = require("../../controllers/products");

router.post(
    "/create",
    [
      body("data.categoryId").notEmpty().isUUID(),
      body("data.productName").notEmpty(),
      body("data.price").notEmpty(),
      body("data.description").notEmpty(),
      body("data.ratingsId").notEmpty(),
      body("data.image").notEmpty(),
      body("data.stocks").notEmpty(),
      body("data.purchaseCount").notEmpty(),
      body("data.status").optional(),

    ],
    validation,
    createProduct
  );

  module.exports = router;