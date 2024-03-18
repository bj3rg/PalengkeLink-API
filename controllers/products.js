const Category = require("../models/Category");
const Products = require("../models/Products");


exports.createProduct = (req, res, next ) => {
    const {
        categoryId,
        productName,
        price,
        description,
        ratingsId,
        image,
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

    Products.findOne({
        where: {
            product_name: productName
        }
    })
    .then((data) => {
        Category.findOne({
            where: {
                id: data.category_id
            }
        })
        .then((existing) => {
            if (existing) {
                return res.status(401).json({
                    success: false,
                    message: "Product name exist in the same category",
                }); 
            }else {
                return res.status(401).json({
                    success: false,
                    message: "Category ID does not exist or Product name exist in the other category",
                }); 
            }
            
        })

        Products.create({
            category_id: categoryId,
            product_name: productName,
            price: price,
            description: description,
            ratings_id: ratingsId,
            image: image,
            stocks: stocks,
            purchase_count: purchaseCount,
            status: status
        })
    })
};