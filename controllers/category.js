const errorHandler = require("../util/errorHandler");
const Category = require("../models/Category");
const Products = require("../models/Products");
const deleteFile = require("../helpers/deleteFile");


exports.createCategory = (req, res, next) => {
  const { category_name, description } = req.body;

  Category.create({
    category_name,
    description,
  })
    .then(() => {
      return res.status(200).json({
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
  const { category_name, description } = req.body;

  Category.update(
    {
      category_name,
      description,
    },
    {
      where: { id: categoryId },
    }
  )
    .then((category) => {
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCategory = (req, res, next) => {
  const { categoryId } = req.params;

  Category.update(
    {
      status: false,
    },
    { where: { id: categoryId } }
  )
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.forceDeleteCategory = (req, res, next) => {
  const { categoryId } = req.params;

  Products.findAll({ where: { category_id: categoryId } })
    .then((products) => {
      // Delete product images associated with the category
      products.forEach((product) => {
        if (product.product_image) {
          deleteFile(product.product_image, "product-upload");
        }
      });

      // Delete products associated with the category
      return Products.destroy({ where: { category_id: categoryId } });
    })
    .then(() => {
      // Delete the category
      return Category.destroy({ where: { id: categoryId } });
    })
    .then(() => {
      // Send success response
      return res.status(200).json({
        success: true,
        message: "Category and associated products deleted permanently",
      });
    })
    .catch((err) => {
      // Handle errors
      console.error("Error deleting category:", err);
      next(err);
    });
};

exports.findAllCategory = (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      return res.status(200).json({
        success: true,
        categories: categories,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findActiveCategory = (req, res, next) => {
  Category.findAll({ where: { status: true } })
    .then((categories) => {
      return res.status(200).json({
        success: true,
        categories: categories,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateCategoryStatus = (req, res, next) => {
  const { categoryId } = req.params;
  const { status } = req.body;

  Category.update(
    { status: status },
    { where: { id: categoryId } }
  )
  .then(() => {
    return Products.update(
      { status: status },
      { where: { category_id: categoryId } }
    );
  })
  .then(() => {
    return res.status(200).json({
      success: true,
      message: "Category status and associated products status updated successfully",
    });
  })
  .catch((err) => {
    next(err);
  });
};
