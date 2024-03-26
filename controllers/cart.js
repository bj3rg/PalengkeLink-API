const Cart = require("../models/Cart");
const Users = require("../models/User");
const Order = require("../models/Orders");
const errorHandler = require("../util/errorHandler");
const Sequelize = require("sequelize");
const Products = require("../models/Products");

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
        as: "orders",
        attributes: ["price", "quantity"],
        where: { status: true },
      },
    ],
  })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      let totalPrice = 0;
      if (cart.orders) {
        cart.orders.forEach((order) => {
          totalPrice += order.price * order.quantity;
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

exports.getTotalItems = (req, res, next) => {
  const { cartId } = req.params;
  console.log(cartId);

  Order.findAll({
    where: {
      cart_id: cartId,
      status: true,
    },
    attributes: [
      [Sequelize.fn("sum", Sequelize.col("quantity")), "totalItems"],
    ],
    raw: true,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
      const totalItems = data.length > 0 ? data[0].totalItems : 0;
      return res.status(200).json({
        success: true,
        totalItems,
      });
    })
    .catch((err) => {
      next(err);
    });
};


exports.deleteOrderInCart = (req, res, next) => {
  const { cartId } = req.params;
  const { orderId } = req.body;

  Order.findOne({
    where: {
      cart_id: cartId,
    },
  })
    .then((cart) => {
      if (!cart) {
        return res.status(400).json({
          success: false,
          message: "Cart not found",
        });
      }
      return Order.findOne({
        where: {
          id: orderId,
          status: true,
        },
      }).then((order) => {
        if (!order) {
          return res.status(400).json({
            success: false,
            message: "Item not found",
          });
        } else {
          order.status = false;

          return order.save();
        }
      });
    })
    .then(() => {
      res.status(200).json({ success: true, message: "Order Updated" });
    })
    .catch((err) => {
      next(err);
    });
};
