const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validation = require("../../middlewares/routeValidation");
const { createUser, updateUser, updateStatus, deleteUser, findUserById, findAllActiveUsers } = require("../../controllers/User");

router.post(
  "/create",
  [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("middle_name").notEmpty(),
    body("address").notEmpty(),
    body("phone_number").notEmpty(),
    body("email_address").notEmpty(),
    body("gender").notEmpty(),
    body("birth_date").notEmpty(),
    body("fcm_token").notEmpty(),
    body("password").notEmpty(),
    body("status").notEmpty(),
  ],
  validation,
  createUser
);

router.put("/:userId/update", [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("middle_name").notEmpty(),
    body("address").notEmpty(),
    body("phone_number").notEmpty(),
    body("email_address").notEmpty(),
    param("userId").notEmpty()
], validation, updateUser);

router.put("/:userId/:stat/update-status", [], updateStatus);
router.delete("/:userId/hard-delete", [], deleteUser);
router.get("/:userId/search", [], findUserById);
router.get("/users", findAllActiveUsers);

module.exports = router;
