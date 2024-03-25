const User = require("../models/User");
const Product = require("../models/Products");
const Rating = require("../models/Ratings");

exports.createRating = (req, res, next) => {
  const { productID, userID } = req.params;
  const { rating, description } = req.body;
  User.findOne({
    where: {
      id: userID,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
    })
    .then(() => {
      return Product.findOne({
        where: {
          id: productID,
        },
      });
    })
    .then((product) => {
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product does not exist",
        });
      }

      return Rating.create({
        rating,
        description,
        user_id: userID,
        product_id: productID,
      });
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Product successfully rated",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateRating = (req, res, next) => {
  const { ratingID } = req.params;
  const { rating, description } = req.body;
  Rating.findOne({
    where: {
      id: ratingID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Rating not found",
        });
      }
      data.rating = rating ? rating : data.rating;
      data.description = description ? description : data.description;
      return data.save().then(() => {
        return res.status(200).json({
          success: true,
          message: "Rating updated",
        });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteRatingbyID = (req, res, next) => {
  const { ratingID } = req.params;
  Rating.findOne({
    where: {
      id: ratingID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Rating not found",
        });
      }
      return data.destroy();
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Rating deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findRatingbyID = (req, res, next) => {
  const { ratingID } = req.params;
  Rating.findOne({
    where: {
      id: ratingID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Rating not found",
        });
      }
      const rating_data = data.map((rate) => ({
        id: ratingID,
        user_id: rate.user_id,
        product_id: rate.product_id,
        rating: rate.rating,
        description: rate.description,
      }));
      return res.status(200).json({
        success: true,
        rating_data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
exports.findAllRatingbyProductID = (req, res, next) => {
  const { productID } = req.params;
  Rating.findAll({
    where: {
      product_id: productID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Error",
        });
      }
      if (data.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No rating data for this product",
        });
      }
      const rating_data = data.map((rate) => ({
        id: rate.id,
        user_id: rate.user_id,
        product_id: productID,
        rating: rate.rating,
        description: rate.description,
      }));
      return res.status(200).json({
        success: true,
        rating_data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findAllRating = (req, res, next) => {
  Rating.findAll()
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: true,
          message: "Error",
        });
      }
      const allRating = data.map((rate) => ({
        id: rate.id,
        user_id: rate.user_id,
        product_id: rate.product_id,
        rating: rate.rating,
        description: rate.description,
      }));
      return res.status(200).json({
        success: true,
        allRating,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findAllRatingbyUserID = (req, res, next) => {
  const { userID } = req.params;
  Rating.findAll({
    where: {
      user_id: userID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Error",
        });
      }
      if (data.length === 0) {
        return res.status(200).json({
          success: true,
          message: "User has no rating",
        });
      }
      const userRating = data.map(
        (rate = {
          id: rate.id,
          user_id: userID,
          product_id: rate.product_id,
          rating: rate.rating,
          description: rate.description,
        })
      );
      return res.status(200).json({ success: true, userRating });
    })
    .catch((err) => {
      next(err);
    });
};
