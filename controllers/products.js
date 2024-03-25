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

// exports.updateProduct = (req, res, next) => {
//   const {productId} = req.params.productId;
//   const {
//     categoryId,
//     productName,
//     price,
//     description,
//     ratingsId,
//     stocks,
//     purchaseCount,
//     status,
//   } = req.body.data || {}; 
//   Products.findOne({ where: { id: productId } })
//     .then((product) => {
//       if (!product) {
//         errorHandler("Product not found!", 404);
//       }

//       if (req.files && req.files.productImage) {
//         const productImage = req.files.productImage[0];
//         deleteFile(product.product_image, "product-upload"); 
//         product.product_image = productImage.filename || null;
//       }

//       if (categoryId) product.category_id = categoryId;
//       if (productName) product.product_name = productName;
//       if (price) product.price = price;
//       if (description) product.description = description;
//       if (ratingsId) product.ratingsId = ratingsId;
//       if (stocks) product.stocks = stocks;
//       if (purchaseCount) product.purchase_count = purchaseCount;
//       if (status) product.status = status;

//       return product.save();
//     })
//     .then((updatedProduct) => {
//       return res.status(200).json({
//         success: true,
//         message: "Product updated successfully",
//         data: updatedProduct,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };
