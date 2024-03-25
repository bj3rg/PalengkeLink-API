const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator");
const {
  signUp,
  sendEmailOTP,
  verifyEmail,
  logIn,
} = require("../../controllers/account");
const Users = require("../../models/User");

router.post(
  "/sign-up",
  [
    body("first_name").notEmpty().trim(),
    body("last_name").notEmpty().trim(),
    body("email_address")
      .notEmpty()
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("birth_date").notEmpty(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .not()
      .isEmpty(),
    body("confirm_password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .not()
      .isEmpty(),
    body("phone_number").trim().isLength({ max: 10 }).not().isEmpty(),
  ],
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

router.post(
  "/log-in",
  [
    body("phoneNum")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username cannot be blank!"),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password cannot be blank!"),
  ],
  validation,
  logIn
);

module.exports = router;
