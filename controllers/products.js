const Category = require("../models/Category");
const Products = require("../models/Products");
const deleteFile = require("../helpers/deleteFile");
const errorHandler = require("../util/errorHandler");

exports.createProduct = (req, res, next) => {
  const {
    categoryId,
    productName,
    price,
    description,
    ratingsId,
    stocks,
    purchaseCount,
  } = req.body.data;

  if (!req.files.productImage) {
    return res.status(401).json({
      success: false,
      message: "No Image Selected",
    });
  }

  const productImage = req.files.productImage[0];

  Category.findOne({
    where: {
      id: categoryId,
    },
  })
    .then((category) => {
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }
      return Products.findOne({
        where: {
          product_name: productName,
        },
      });
    })
    .then((existingProduct) => {
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: "Product name already exists!",
        });
      } else {
        return Products.create({
          category_id: categoryId,
          product_name: productName,
          price: price,
          description: description,
          ratings_id: ratingsId || null,
          product_image: productImage.filename || null,
          stocks: stocks,
          purchase_count: purchaseCount,
        });
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Product created successfully",
      });
    })

    .catch((err) => {
        if (productImage) {
          deleteFile(productImage.filename, "product-upload");
        }
      console.log(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  const {
    categoryId,
    productName,
    price,
    description,
    ratingsId,
    stocks,
    purchaseCount,
    status,
  } = req.body.data || {}; // Destructure req.body.data with default value as empty object

  // Logic to update product details
  Products.findOne({ where: { id: productId } })
    .then((product) => {
      if (!product) {
        errorHandler("Product not found!", 404);
      }

      // If product image exists in request, delete the old image and update the image filename
      if (req.files && req.files.productImage) {
        const productImage = req.files.productImage[0];
        deleteFile(product.product_image, "product-upload"); // Delete old image
        product.product_image = productImage.filename || null; // Update image filename
      }

      // Update other product properties if provided
      if (categoryId) product.category_id = categoryId;
      if (productName) product.product_name = productName;
      if (price) product.price = price;
      if (description) product.description = description;
      if (ratingsId) product.ratingsId = ratingsId;
      if (stocks) product.stocks = stocks;
      if (purchaseCount) product.purchase_count = purchaseCount;
      if (status) product.status = status;

      // Save the updated product
      return product.save();
    })
    .then((updatedProduct) => {
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    })
    .catch((err) => {
      next(err);
    });
};
