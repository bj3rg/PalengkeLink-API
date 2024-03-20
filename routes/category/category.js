const express = require("express");
const { body } = require("express-validator");
const Validation = require("../../middlewares/routeValidation");
const router = express.Router();

const {
  createCategory,
  updateCategory,
} = require("../../controllers/category");

router.post(
  "/create",
  [body("category_name").notEmpty()],
  Validation,
  createCategory
);

router.put(
  "/:categoryId/update",
  [body("category_name").optional()],
  Validation,
  updateCategory
);

module.exports = router;
