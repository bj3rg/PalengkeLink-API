const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validation = require("../../middlewares/routeValidation");
const {
  createVoucher,
  deleteVoucher,
  updateVoucher,
  findAllVoucher,
  findAllValidVoucher,
  findVoucherbyVoucher,
  findVoucherbyID,
} = require("../../controllers/voucher");

router.post(
  "/:voucherCode/voucher-create",
  [
    body("voucher_code").notEmpty(),
    body("title").notEmpty(),
    body("validity_date").notEmpty().isDate(),
    body("percent_off").notEmpty().isDecimal(),
    param("voucherCode").notEmpty(),
  ],
  validation,
  createVoucher
);

router.delete(
  "/:voucherID/voucher-delete",
  [param("voucherID").isUUID()],
  validation,
  deleteVoucher
);

router.put(
  "/:voucherCode/voucher-update",
  [
    param("voucherCode").notEmpty(),
    body("title").notEmpty(),
    body("validity_date").notEmpty().isDate(),
    body("percent_off").isDecimal().notEmpty(),
    body("is_available").notEmpty(),
    body("is_single_use").notEmpty(),
  ],
  validation,
  updateVoucher
);

router.get("/all-voucher", validation, findAllVoucher);

router.get("/all-valid-voucher", validation, findAllValidVoucher);

router.get(
  "/:voucherCode/voucher-code",
  [param("voucherCode").notEmpty()],
  validation,
  findVoucherbyVoucher
);

router.get(
  "/:voucherID/voucher-id",
  [param("voucherID").isUUID().notEmpty()],
  validation,
  findVoucherbyID
);

module.exports = router;
