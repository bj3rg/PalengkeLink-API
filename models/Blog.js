const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const User = require("../models/User");

const Blogs = sequelizeConnect.define(
  "Blogs",
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
    header: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    blog_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    blog_image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
  }
);

Blogs.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "blog",
});

module.exports = Blogs;
