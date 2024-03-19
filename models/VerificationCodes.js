const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const Users = require("../models/User");

const VerificationCodes = sequelizeConnect.define(
  "VerificationCodes",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // user_id: {
    //   type: Sequelize.UUID,
    //   allowNull: true,
    //   defaultValue: 0,
    // },
    email_address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    verification_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ip_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = VerificationCodes;
