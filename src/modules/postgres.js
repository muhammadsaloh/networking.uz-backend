const Sequelize = require("sequelize");
const Models = require("./models");

const sequelize = new Sequelize(process.env.PG_URL, {
	logging: false,
});

async function postgres() {
	try {
		let db = {};

		db.users = await Models.UserModel(Sequelize, sequelize);

		await sequelize.sync({ force: false });

		return db;
	} catch (error) {
		console.log(error);
	}
}

module.exports = postgres;