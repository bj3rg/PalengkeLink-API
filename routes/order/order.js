const express = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  findOrderById,
  findAllOrdersByCartId,
} = require("../../controllers/Order");
const { body, param } = require("express-validator");
const validation = require("../../middlewares/routeValidation");
const router = express.Router();

router.post("/create", [], validation, createOrder);
router.put("/:orderId/update", [], validation, updateOrder);
router.delete("/:orderId/delete", [], validation, deleteOrder);
router.get("/:orderId/search", [], validation, findOrderById);
router.get("/:cartId/orders", [], validation, findAllOrdersByCartId);

module.exports = router;
