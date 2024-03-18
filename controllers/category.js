const errorHandler = require("../util/errorHandler");
const Category = require("../models/Category");

exports.createCategory = (req, res, next) => {
  const { category_name } = req.body;

  Category.findOne({
    where: {
      category_name: category_name,
    },
  })
    .then((data) => {
      if (data) {
        return res.status(400).json({
          success: false,
          message: "Category name already taken",
        });
      } else {
        return Category.create({
          category_name,
        });
      }
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Category created",
      });
    })
    .catch(() => {
      next(err);
    });
};
