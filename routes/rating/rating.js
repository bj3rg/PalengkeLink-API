const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const routeValidation = require("../../middlewares/routeValidation");
const {
  createRating,
  updateRating,
  deleteRatingbyID,
  findAllRating,
  findRatingbyID,
  findAllRatingbyProductID,
  findAllRatingbyUserID,
} = require("../../controllers/rating");

router.post(
  "/create-rating",
  [
    param("productID").isUUID().notEmpty(),
    param("userID").isUUID().notEmpty(),
    body("rating").notEmpty(),
    body("description").notEmpty(),
  ],
  routeValidation,
  createRating
);

router.put(
  "/:ratingID/update-rating",
  [
    param("ratingID").isUUID().notEmpty(),
    body("rating").notEmpty(),
    body("description").notEmpty(),
  ],
  routeValidation,
  updateRating
);

router.delete(
  "/:ratingID/delete-rating",
  [param("ratingID").isUUID().notEmpty()],
  routeValidation,
  deleteRatingbyID
);

router.get("/all-rating", routeValidation, findAllRating);

router.get(
  "/:productID/all-rating-by-product-id",
  [param("productID").isUUID().notEmpty()],
  routeValidation,
  findAllRatingbyProductID
);

router.get(
  "/:ratingID/rating-by-id",
  [param("ratingID").isUUID().notEmpty()],
  routeValidation,
  findRatingbyID
);

router.get(
  "/:userID/all-rating-by-user-id",
  [param("userID").isUUID().notEmpty()],
  routeValidation,
  findAllRatingbyUserID
);

module.exports = router;
