const { generateCrypt, compareCrypt } = require("../modules/bcrypt");
const { generateToken } = require("../modules/jwt");
const Validations = require("../utils/validation");

module.exports = class UserController {
	static async UserSignUpPostController(req, res) {
		try {
			const data =
				await Validations.UserRegisterValidation().validateAsync(
					req.body
				);

			const user = await req.db.users.create({
				user_name: data.name,
				user_password: await generateCrypt(data.password),
				user_email: data.email,
			});

			res.status(201).json({
				ok: true,
				message: "Registered Successfully",
				data: generateToken({
					id: user.dataValues.user_id,
				}),
			});
		} catch (error) {
			if ((error = "SequelizeUniqueConstraintError: Validation error")) {
				error = "Email already exists";
			}
			res.status(400).json({
				ok: false,
				message: error + "",
			});
		}
	}
	static async UserLoginPostController(req, res) {
		try {
			const data = await Validations.UserLoginValidation().validateAsync(
				req.body
			);

			const user = await req.db.users.findOne({
				where: {
					user_email: data.email,
				},
			});

			if (!user) throw new Error("User not found");

			const isValid = await compareCrypt(
				data.password,
				user.dataValues.user_password
			);

			if (!isValid) throw new Error("Password is incorrect");

			res.status(200).json({
				ok: true,
				message: "Successfully logged",
				data: generateToken({
					id: user.dataValues.user_id,
				}),
			});
		} catch (error) {
			res.status(400).json({
				ok: false,
				message: error + "",
			});
		}
	}

	static async GetMeController(req, res) {
		try {
			const user = await req.user;

			res.json({
				ok: true,
				data: {
					name: user.user_name,
					email: user.user_email,
					verified: user.user_verified,
					role: user.user_role,
				},
			});
		} catch (error) {
			res.status(400).json({
				ok: true,
				message: error + "",
			});
		}
	}
};