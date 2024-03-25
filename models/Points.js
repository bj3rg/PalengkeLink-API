const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const User = require("../models/User");

const Points = sequelizeConnect.define(
  "points",
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
    points: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "points",
    timestamps: true,
  }
);

Points.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});

module.exports = Points;
