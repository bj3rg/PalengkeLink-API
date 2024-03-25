const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");


const Token = sequelizeConnect.define(
  "token",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "token",
    timestamps: true,
  }
);

module.exports = Token;
