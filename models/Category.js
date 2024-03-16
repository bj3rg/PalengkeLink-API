const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Category = sequelizeConnect.define(
  "category",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    category_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "category",
    timestamps: true,
  }
);

module.exports = Category;
