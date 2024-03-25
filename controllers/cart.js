const Cart = require("../models/Cart");
const Users = require("../models/User");
const Order = require("../models/Orders");
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
          total_price: total_price || null,
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

exports.getTotalPrice = (req, res, next) => {
  const { cartId } = req.params;

  Cart.findOne({
    where: {
      id: cartId,
    },
    include: [
      {
        model: Order,
        attributes: ["price"],
      },
    ],
  })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });
      }

      let totalPrice = 0;
      if (cart.orders) {
        cart.orders.forEach((order) => {
          totalPrice += order.price;
        });
      }

      return res.status(200).json({
        success: true,
        totalPrice: totalPrice,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
