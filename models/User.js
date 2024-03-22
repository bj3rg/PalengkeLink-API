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
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },
    phone_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    fcm_token: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 0,
    },
    password: {
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
    tableName: "users",
    timestamps: true,
  }
);

module.exports = Users;
