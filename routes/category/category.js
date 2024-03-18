const express = require("express");
const { body } = require("express-validator");
const Validation = require("../../middlewares/routeValidation");
const router = express.Router();

const { createCategory } = require("../../controllers/category");

router.post(
  "/create",
  [body("category_name").notEmpty()],
  Validation,
  createCategory
);

module.exports = router;
