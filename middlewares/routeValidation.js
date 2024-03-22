// const { validationResult } = require("express-validator");

// module.exports = (req, res, next) => {
//   const errors = validationResult(req);
//   console.log(req.body);
//   if (!errors.isEmpty()) {
//     const error = new Error("Invalid request!");
//     error.statusCode = 422;
//     error.data = errors.array();
//     // return res.status(200);
//     throw error;
//   }
//   next();
// };

const { validationResult } = require("express-validator");
const deleteFile = require("../helpers/image");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.files && req.files.productImage) {
      const productImage = req.files.productImage[0];
      deleteFile(productImage.filename, "product-upload");
    }
    const error = new Error("Invalid request!");
    console.log(errors);
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }
  next();
};
