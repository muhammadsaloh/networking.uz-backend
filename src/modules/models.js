module.exports = class Models {
	static async UserModel(Sequelize, sequelize) {
		return sequelize.define("users", {
			user_id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			user_email: {
				type: Sequelize.DataTypes.STRING,
				is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				allowNull: false,
				unique: true,
			},
			user_password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			user_name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			user_verified: {
				type: Sequelize.DataTypes.BOOLEAN,
				defaultValue: false,
			},
			user_role: {
				type: Sequelize.DataTypes.ENUM,
				values: ["admin", "user"],
				defaultValue: "user",
			},
		});
	}
};