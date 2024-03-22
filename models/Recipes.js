const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const Products = require("./Products");

const Recipes = sequelizeConnect.define(
  "recipes",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    dish_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    tableName: "recipes",
    timestamps: false,
  }
);

Recipes.hasMany(Products, { as: "products" });

module.exports = Recipes;
