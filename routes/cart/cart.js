const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validation = require("../../middlewares/routeValidation");

const { createCart } = require("../../controllers/cart");

router.post(
  "/create",
  [body("user_id").notEmpty().isUUID(), body("total_price").optional()],
  validation,
  createCart
);

module.exports = router;
