const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

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
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Orders;
