const Blog = require("../models/Blog");
const User = require("../models/User");
const connection = require("../connection/database");

exports.createBlog = (req, res, next) => {
  const { header, description } = req.body;

  if (!req.files.blog_image) {
    return res.status(401).json({
      success: false,
      message: "No image selected",
    });
  }
  const blog_image = req.files.blog_image[0];
};
