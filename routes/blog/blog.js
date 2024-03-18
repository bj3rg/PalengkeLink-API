const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator");

const {
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../../controllers/blog");

router.post(
  "/create-blog",
  [body("header").notEmpty(), body("description").notEmpty()],
  validation,
  createBlog
);

router.put(
  "/create-blog",
  [
    param("blogID").isUUID(),
    body("header").notEmpty(),
    body("description").notEmpty(),
  ],
  validation,
  updateBlog
);

router.delete(
  "/create-blog",
  [param("blogID").isUUID()],
  validation,
  deleteBlog
);

module.exports = router;
