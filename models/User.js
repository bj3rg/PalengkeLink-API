const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Users = sequelizeConnect.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    middle_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    fcm_token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = Users;
