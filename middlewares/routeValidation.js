const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid request!");
    console.log(errors);
    error.statusCode = 422;
    error.data = errors.array();
    // return res.status(200);
    throw error;
  }
  next();
};
