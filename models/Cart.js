const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Cart = sequelizeConnect.define(
  "cart",
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
    total_price: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
  }
);


module.exports = Cart;
