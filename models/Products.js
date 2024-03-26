const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const ProductCategory = require("./Product-Category");
const Ratings = require("./Ratings");

const Products = sequelizeConnect.define(
  "products",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ratings_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    product_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stocks: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    purchase_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

Products.belongsTo(ProductCategory, {
  foreignKey: "category_id",
  targetKey: "id",
  as: "category",
});

Products.belongsTo(Ratings, {
  foreignKey: "ratings_id",
  targetKey: "id",
  as: "rating",
});

module.exports = Products;
