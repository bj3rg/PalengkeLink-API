const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validation = require("../../middlewares/routeValidation");
const jsonParser = require("../../helpers/jsonParser");
const {
  createUser,
  updateUser,
  updateStatus,
  deleteUser,
  findUserById,
  findAllActiveUsers,
} = require("../../controllers/User");

router.post(
  "/create",
  jsonParser,
  [
    body("data.first_name").notEmpty(),
    body("data.last_name").notEmpty(),
    body("data.middle_name").notEmpty(),
    body("data.address").notEmpty(),
    body("data.phone_number").notEmpty(),
    body("data.email_address").notEmpty(),
    body("data.gender").notEmpty(),
    body("data.birth_date").notEmpty(),
    body("data.fcm_token").optional(),
    body("data.password").notEmpty(),
  ],
  validation,
  createUser
);

router.put(
  "/:userId/update",
  [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("middle_name").notEmpty(),
    body("address").notEmpty(),
    body("phone_number").notEmpty(),
    body("email_address").notEmpty(),
    param("userId").notEmpty(),
  ],
  validation,
  updateUser
);

router.put("/:userId/:stat/update-status", [], updateStatus);
router.delete("/:userId/hard-delete", [], deleteUser);
router.get("/:userId/search", [], findUserById);
router.get("/users", findAllActiveUsers);

module.exports = router;
