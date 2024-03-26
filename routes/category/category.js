const express = require("express");
const { body, param } = require("express-validator");
const Validation = require("../../middlewares/routeValidation");
const router = express.Router();
const Category = require("../../models/Product-Category")

const {
  createCategory,
  updateCategory,
  deleteCategory,
  forceDeleteCategory,
  findAllCategory,
  findActiveCategory,
  updateCategoryStatus
} = require("../../controllers/category");

router.post(
  "/create",
  [
    body("category_name").notEmpty()
    .custom((value, { req }) => {
      return Category.findOne({
        where: {
          category_name: value,
        },
      }).then((category) => {
        if (category) {
          return Promise.reject("Category name already exists!");
        }
      });
    }),
    body("description").optional()
  ],
  Validation,
  createCategory
);

router.put(
  "/:categoryId/update",
  [
    param("categoryId").isUUID()
    .custom((value, { req }) => {
      return Category.findOne({
        where: {
          id: value,
        },
      }).then((category) => {
        if (!category) {
          return Promise.reject("Category ID does not exists!");
        }
      });
    }),
    body("category_name").optional(),
    body("description").optional()
  ],
  Validation,
  updateCategory
);

router.put(
  "/:categoryId/delete",
  [
    param("categoryId").isUUID()
    .custom((value, { req }) => {
      return Category.findOne({
        where: {
          id: value,
        },
      }).then((category) => {
        if (!category) {
          return Promise.reject("Category ID does not exists!");
        }
      });
    }),
  ],
  Validation,
  deleteCategory
);

router.delete(
  "/:categoryId/force-delete",
  [
    param("categoryId").isUUID()
    .custom((value, { req }) => {
      return Category.findOne({
        where: {
          id: value,
        },
      }).then((category) => {
        if (!category) {
          return Promise.reject("Category ID does not exists!");
        }
      });
    }),
  ],
  Validation,
  forceDeleteCategory
);

router.get(
  "/find-all-category",
  Validation,
  findAllCategory
);

router.get(
  "/find-active-category",
  Validation,
  findActiveCategory
);

router.put(
  "/:categoryId/update-status",
  [
    param("categoryId").isUUID()
    .custom((value, { req }) => {
      return Category.findOne({
        where: {
          id: value,
        },
      }).then((category) => {
        if (!category) {
          return Promise.reject("Category ID does not exists!");
        }
      });
    }),
    body("status").notEmpty()
  ],
  Validation,
  updateCategoryStatus
);

module.exports = router;
