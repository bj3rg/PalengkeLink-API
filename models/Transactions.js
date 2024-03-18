const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

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
    product_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    voucher_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: Sequelize.ENUM("Gcash", "CashOnDelivery", "PalengkeCoins"),
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
  }
);

module.exports = Transactions;
