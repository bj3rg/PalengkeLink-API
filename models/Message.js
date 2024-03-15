const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Messages = sequelizeConnect.define(
  "messages",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    sender_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    receiver_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("Sent", "Delivered", "Seen"),
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
  }
);

module.exports = Messages;
