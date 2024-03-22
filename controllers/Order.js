const Orders = require("../models/Orders");
const Cart = require("../models/Cart");

exports.createOrder = (req, res, next) => {
  const { item_id, quantity, cart_id, price } = req.body;
  Orders.create({
    item_id,
    quantity,
    cart_id,
    price,
  })
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Order added to cart" });
    })
    .catch((err) => {
      next(err);
    });
};

//update order
exports.updateOrder = (req, res, next) => {
  const { orderId } = req.params;
  const { item_id, quantity, cart_id, price } = req.body;
  Orders.findOne({
    where: {
      id: orderId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(401)
          .json({ success: false, message: "Order id not found" });
      } else {
        data.item_id = item_id ? item_id : data.item_id;
        data.quantity = quantity ? quantity : data.quantity;
        data.price = price ? price : data.price;
        return data.save().then(() => {
          return res
            .status(200)
            .json({ success: true, message: "Order updated successfully" });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

//delete order
exports.deleteOrder = (req, res, next) => {
  const { orderId } = req.params;
  Orders.findOne({
    where: {
      id: orderId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(401)
          .json({ success: false, message: "Order id not found" });
      } else {
        return data.destroy().then(() => {
          return res
            .status(200)
            .json({ success: true, message: "Order removed successfully" });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

//get all orders by cart id
exports.findAllOrdersByCartId = (req, res, next) => {
  const { cartId } = req.params;
  Cart.findOne({
    where: {
      id: cartId,
    },
  })
    .then((cart) => {
      if (!cart) {
        return res
          .status(401)
          .json({ success: false, message: "Cart id not found" });
      }
      Orders.findAll({
        where: {
          cart_id: cartId,
        },
      }).then((data) => {
        return res.status(200).json({ success: true, orders: data });
      });
    })
    .catch((err) => {
      next(err);
    });
};

//get order by order id
exports.findOrderById = (req, res, next) => {
  const { orderId } = req.params;
  Orders.findOne({
    where: {
      id: orderId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(401)
          .json({ success: false, message: "Order id not found" });
      } else {
        return res.status(200).json({ success: true, order: data });
      }
    })
    .catch((err) => {
      next(err);
    });
};
