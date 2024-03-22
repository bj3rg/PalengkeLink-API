const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator");
const {
  signUp,
  sendEmailOTP,
  verifyEmail,
} = require("../../controllers/account");
const Users = require("../../models/User");

router.post(
  "/sign-up",
  [body("email_address").notEmpty().isEmail(), body("password").notEmpty()],
  validation,
  signUp
);

router.post(
  "/send-email-OTP",
  [body("email_address").isEmail().withMessage("Please enter a valid email")],
  validation,
  sendEmailOTP
);

router.post(
  "/verify-email",
  [
    body("email_address").notEmpty().isEmail(),
    body("verification_code").notEmpty(),
  ],
  validation,
  verifyEmail
);

module.exports = router;
