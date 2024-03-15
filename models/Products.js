const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

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
		item_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		kilogram: {
			type: Sequelize.DOUBLE,
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
			allowNull: false,
		},
		image: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		stocks: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		prurchase_counts: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "products",
    timestamps: true,
	}
);

module.exports = Products;

	