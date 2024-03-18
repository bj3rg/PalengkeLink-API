const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const History = sequelizeConnect.define(
  "history", 
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    transaction_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    order_staus: {
      type: Sequelize.ENUM('cancelled', 'completed'),
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    tableName: "history",
    timestamps: true,
  }
);

module.exports = History;