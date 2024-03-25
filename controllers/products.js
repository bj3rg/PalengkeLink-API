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

  Products.create({
    category_id: categoryId,
    product_name: productName,
    price: price,
    description: description,
    ratings_id: ratingsId || null,
    product_image: productImage.filename || null,
    stocks: stocks,
    purchase_count: purchaseCount,
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
  const {
    categoryId,
    productName,
    price,
    description,
    ratingsId,
    stocks,
    purchaseCount,
  } = req.body.data || {};

  const { productId } = req.params;

  const updatedProduct = {};
  if (categoryId) updatedProduct.category_id = categoryId;
  if (productName) updatedProduct.product_name = productName;
  if (price) updatedProduct.price = price;
  if (description) updatedProduct.description = description;
  if (ratingsId) updatedProduct.ratings_id = ratingsId;
  if (stocks) updatedProduct.stocks = stocks;
  if (purchaseCount) updatedProduct.purchase_count = purchaseCount;

  if (req.files && req.files.productImage) {
    const productImage = req.files.productImage[0];
    Products.findOne({ where: { id: productId } })
      .then((product) => {
        if (product.product_image) {
          deleteFile(product.product_image, "product-upload");
        }
      })
      .catch((err) => {
        console.log("Error deleting old image:", err);
      });
    updatedProduct.product_image = productImage.filename;
  }

  Products.update(updatedProduct, { where: { id: productId } })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    })
    .catch((err) => {
      console.log("Error updating product:", err);
      next(err);
    });
};


exports.findProductsByCategory = (req, res, next) => {
  const { categoryId } = req.params;

  Products.findAll({
    where: {
      category_id: categoryId,
    },
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
  })
    .then((products) => {
      if (products.length === 0) {
        return res.status(404).json({ success: false, message: "No products found in the specified category." });
      }

      const result = {
        success: true,
        category: {
          id: products[0].category.id,
          category_name: products[0].category.category_name,
          description: products[0].category.description,
          status: products[0].category.status,
        },
        products: products.map((product) => ({
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          description: product.description,
          product_image: product.product_image,
          stocks: product.stocks,
          purchase_count: product.purchase_count,
          status: product.status,
        })),
      };

      return res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.findActiveProductsByCategory = (req, res, next) => {
  const { categoryId } = req.params;

  Products.findAll({
    where: {
      category_id: categoryId,
      status: true
    },
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
  })
    .then((products) => {
      if (products.length === 0) {
        return res.status(404).json({ success: false, message: "No products found in the specified category." });
      }

      const result = {
        success: true,
        category: {
          id: products[0].category.id,
          category_name: products[0].category.category_name,
          description: products[0].category.description,
          status: products[0].category.status,
        },
        products: products.map((product) => ({
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          description: product.description,
          product_image: product.product_image,
          stocks: product.stocks,
          purchase_count: product.purchase_count,
          status: product.status,
        })),
      };

      return res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const {productId} = req.params;

  Products.findOne({
    where: {id: productId}
  })
  .then((product)=> {
    if (!product){
      errorHandler("Product Id does not exist")
    }
    return product.update({ status: false });
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    })
    .catch((err) => {
      next(err);
    });
};


exports.forceDeleteProduct = (req, res, next) => {
  const { productId } = req.params;

  Products.findOne({
    where: { id: productId }
  })
    .then((product) => {
      if (!product) {
        return errorHandler("Product Id does not exist", 404);
      }
      return product.destroy();
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Product permanently deleted"
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateProductStatus = (req, res, next) => {
  const { productId } = req.params;
  const { status } = req.body;

  Products.update(
    { status: status },
    { where: { id: productId } }
  )
    .then((result) => {
      if (result[0] === 0) {
        return errorHandler("Product not found", 404);
      }
      res.status(200).json({
        success: true,
        message: "Product status updated successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.searchProductById = (req, res, next) => {
  const { productId } = req.params;

  Products.findByPk(productId)
    .then((product) => {
      console.log(product);

      if (!product) {
        return errorHandler("Product not found", 400);
      }
      return res.status(200).json({
        success: true,
        product,
      });
    })
    .catch((err) => {
      next(err);
    });
};