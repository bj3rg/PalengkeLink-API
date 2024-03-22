const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const Users = require("./User");

const Places = sequelizeConnect.define(
  "places",
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
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    middle_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    details: {
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
    tableName: "places",
    timestamps: true,
  }
);

Places.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});

module.exports = Places;
