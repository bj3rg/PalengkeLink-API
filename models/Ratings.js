const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const User = require("../models/User");
const Product = require("../models/Products");
const Ratings = sequelizeConnect.define(
  "Ratings",
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
    rating: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "ratings",
    timestamps: true,
  }
);

Ratings.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});

// Ratings.belongsTo(Product, {
//   foreignKey: "product_id",
//   targetKey: "id",
//   as: "product",
// });

module.exports = Ratings;
