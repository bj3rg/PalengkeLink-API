const Cart = require("../models/Cart");
const Users = require("../models/User");
const errorHandler = require("../util/errorHandler");

exports.createCart = (req, res, next) => {
  const { user_id, total_price } = req.body;

  Users.findOne({
    where: {
      id: user_id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found!",
        });
      } else {
        return Cart.create({
          user_id,
          total_price,
        });
      }
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Cart created",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
