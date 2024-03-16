const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator")

const {createProduct} = require("../../controllers/products");

router.post(
    "/create",
    [
      body("category_id").notEmpty().isUUID(),
      body("item_name").notEmpty(),
      body("kilogram").notEmpty(),
      body("price").notEmpty(),
      body("description").notEmpty(),
      body("ratings_id").notEmpty(),
      body("image").notEmpty(),
      body("stocks").notEmpty(),
      body("purchase_count").notEmpty(),
      body("status").optional(),

    ],
    validation,
    createProduct
  );

  module.exports = router;