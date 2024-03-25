const errorHandler = require("../util/errorHandler");
const Category = require("../models/Category");

exports.createCategory = (req, res, next) => {
  const { category_name, description } = req.body;

  Category.create({
    category_name,
    description
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

    Category.update({
      category_name,
      description
    },
    {
      where: {id: categoryId}
    })
    .then((category) => {
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
    });
    })
    .catch (err => {
      next(err);
    })
};

exports.deleteCategory = (req, res, next) => {
  const { categoryId } = req.params;

  Category.update({
  status: false
  },
    { where: { id: categoryId} 
  })
  .then( () => {
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
  });
  })
  .catch (err => {
    next(err);
  })
};

exports.forceDeleteCategory = (req, res, next) => {
  const { categoryId } = req.params;

  Category.destroy(
    { where: { id: categoryId} 
  })
  .then( () => {
    return res.status(200).json({
      success: true,
      message: "Category deleted permanently",
  });
  })
  .catch (err => {
    next(err);
  })
};

exports.findAllCategory = (req, res, next) => {
  Category.findAll()
  .then( (categories) => {
    return res.status(200).json({
      success: true,
      categories: categories
  });
  })
  .catch (err => {
    next(err);
  })
};

exports.findActiveCategory = (req, res, next) => {
  Category.findAll({ where:{ status: true}})
  .then( (categories) => {
    return res.status(200).json({
      success: true,
      categories: categories
  });
  })
  .catch (err => {
    next(err);
  })
};
