const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const Cart = require("./Cart");
const Products = require("./Products");

const Orders = sequelizeConnect.define(
  "Orders",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    item_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cart_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    transaction_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

Cart.hasMany(Orders, {
  foreignKey: "cart_id",
  as: "orders",
});

Orders.belongsTo(Cart, {
  foreignKey: "cart_id",
  targetKey: "id",
  as: "cart",
});

Orders.hasOne(Products, {
  foreignKey: "item_id",
  targetKey: "id",
  as: "product",
});

module.exports = Orders;
