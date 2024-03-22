const express = require("express");
const router = express.Router();
const { body, params } = require("express-validator");
const validation = require("../../middlewares/routeValidation");
const { createVoucher } = require("../../controllers/voucher");

router.post(
  "/create-voucher",
  [
    body("voucher_code").notEmpty(),
    body("title").notEmpty(),
    body("validity_date").notEmpty().isDate(),
    body("percent_off").notEmpty().isDecimal(),
  ],
  validation,
  createVoucher
);

module.exports = router;
