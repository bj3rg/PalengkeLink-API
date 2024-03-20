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
        return errorHandler("category wala", 400);
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
    .catch((err) => {
      next(err);
    });
};

exports.updateCategory = (req, res, next) => {
  const { categoryId } = req.params;
  const { category_name } = req.body;

  Category.findOne({
    where: {
      id: categoryId,
    },
  })
    .then((existingCategory) => {
      if (!existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category ID does not exist",
        });
      }
      return Category.findOne({
        where: {
          category_name: category_name,
        },
      });
    })
    .then((categoryWithName) => {
      if (categoryWithName) {
        return res.status(400).json({
          success: false,
          message: "Category name already taken",
        });
      }
      return Category.update(
        { category_name: category_name },
        { where: { id: categoryId } }
      );
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Category updated",
      });
    })
    .catch((err) => {
      errorHandler(err, 500);
    });
};

exports.deleteCategory = (req, res, next) => {
  const { categoryId } = req.params;
};

exports.getAllCategory = (req, res, next) => {
  Category.findAll({
    where: {
      status: "true",
    },
  })
    .then((data) => {
      const categories = data.map((category) => ({
        id: category.id,
        category_name: category.category_name,
      }));
      res.status(200).json({ success: true, categories });
    })
    .catch((err) => {
      errorHandler(err, 500);
    });
};
