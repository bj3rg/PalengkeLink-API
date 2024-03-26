const express = require("express");
const router = express.Router();
const validation = require("../../middlewares/routeValidation");
const { body, param } = require("express-validator");

const {
  createBlog,
  updateBlog,
  deleteBlog,
  findAllBlog,
  findBlogbyID,
  findAllBlogbyUserID,
} = require("../../controllers/blog");

router.post(
  "/create-blog",
  [body("header").notEmpty(), body("description").notEmpty()],
  validation,
  createBlog
);

router.put(
  "/update-blog/:blogID",
  [
    param("blogID").isUUID(),
    body("header").notEmpty(),
    body("description").notEmpty(),
  ],
  validation,
  updateBlog
);

router.delete(
  "/delete-blog/:blogID",
  [param("blogID").isUUID()],
  validation,
  deleteBlog
);

// router.get(
//   "/search-all-blog/:userID",
//   [param("userID").isUUID()],
//   validation,
//   findAllBlogbyUserID
// );

router.get(
  "/search-blog/:blogID",
  [param("blogID").isUUID()],
  validation,
  findBlogbyID
);

router.get("/search-all-blog", validation, findAllBlog);

module.exports = router;
