const Orders = require("../models/Orders");

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
//delete order
//get all orders by cart id
//get all orders
