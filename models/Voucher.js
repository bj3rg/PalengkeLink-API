const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Vouchers = sequelizeConnect.define(
  "Vouchers",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    voucher_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    validity_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    percent_off: {
      type: Sequelize.DECIMAL(10, 5),
      allowNull: false,
    },
    is_available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_single_use: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "vouchers",
    timestamps: true,
  }
);

module.exports = Vouchers;
