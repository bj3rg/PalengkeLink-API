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
    fname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    mname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone_number: {
      type: Sequelize.INTEGER,
      allowNull: true,
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
      allowNull: false,
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: false,
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
