const { checkToken } = require("../modules/jwt");

module.exports = async function AuthMiddleware(req, res, next) {
	try {
		if (!req.headers.authorization) throw "Token not found";

		if (!req.headers.authorization.toString().startsWith("Bearer "))
			throw "Token isn't valid";

		let token = req.headers.authorization.toString().replace("Bearer ", "");

		token = checkToken(token);

		if (!token) throw "Token isn't valid";

		const user = await req.db.users.findOne({
			where: {
				user_id: token.id,
			},
		});

		if (!user) throw "User not found";

		req.user = user.dataValues;

		next();
	} catch (error) {
		res.status(403).json({
			ok: false,
			message: error + "",
		});
	}
};