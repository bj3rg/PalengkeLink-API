const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validation = require("../../middlewares/routeValidation");

const {
  createCart,
  getTotalPrice,
  getTotalItems,
  deleteOrderInCart,
} = require("../../controllers/cart");

router.post(
  "/create",
  [body("user_id").notEmpty().isUUID(), body("total_price").optional()],
  validation,
  createCart
);

router.get(
  "/:cartId/get-total-price",
  param("cartId").isUUID(),
  validation,
  getTotalPrice
);

router.get(
  "/:cartId/get-total-items",
  param("cartId").isUUID(),
  validation,
  getTotalItems
);

router.put(
  "/:cartId/delete-order",
  [body("orderId").notEmpty().isUUID()],
  validation,
  deleteOrderInCart
);

module.exports = router;
