const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const Orders = require("./Orders");

const Transactions = sequelizeConnect.define(
  "transactions",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    order_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    voucher_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    payment_method: {
      type: Sequelize.ENUM("Cash", "GrabPay", "ShopeePay", "LykaGems", "Gcash", "Paymaya"),
      allowNull: false,
    },
    delivery_courier: {
      type: Sequelize.ENUM("ZaganaExpress", "GrabExpress", "StorePickup"),
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time_start: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    time_end: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    place_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    transaction_status: {
      type: Sequelize.ENUM("Preparing to Ship", "Picked up by the Courier", "Out for Delivery"),
      allowNull: false,
    },
    reference_no: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,//false
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
  }
);

Transactions.hasMany(Orders, {
  foreignKey: "transaction_id",
  as: "orders",
});

module.exports = Transactions;
