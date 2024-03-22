const Category = require("../models/Category");
const Products = require("../models/Products");
const deleteFile = require("../helpers/image");
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
        status
    } = req.body.data;

    if (!req.files.productImage) {
        return res.status(401).json({
            success: false,
            message: "No Image Selected"
        });
    }

    const productImage = req.files.productImage[0];

    Category.findOne({ where: { id: categoryId } })
        .then(category => {
            if (!category) {
                errorHandler("Category ID does not exist!", 400);
            }

            return Products.findOne({ where: { product_name: productName } });
        })
        .then(existingProduct => {
            if (existingProduct) {
                errorHandler("Product name already exists!", 400);
            }

            return Products.create({
                category_id: categoryId,
                product_name: productName,
                price: price,
                description: description,
                ratingsId: ratingsId,
                product_image: productImage.filename || null,
                stocks: stocks,
                purchase_count: purchaseCount,
                status: status
            });
        })
        .then((createdProduct) => {
            return res.status(200).json({
                success: true,
                message: "Product created successfully",
                product: createdProduct
            });
        })
        .catch((err) => {
            if (productImage) {
                deleteFile(productImage.filename, "product-upload");
            }
            next(err);
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
        status
    } = req.body.data || {}; // Destructure req.body.data with default value as empty object

    // Logic to update product details
    Products.findOne({ where: { id: productId } })
        .then(product => {
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
        .then(updatedProduct => {
            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct
            });
        })
        .catch(err => {
            next(err);
        });
};
