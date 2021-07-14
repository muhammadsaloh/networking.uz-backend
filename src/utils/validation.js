const Joi = require("joi");

module.exports = class Validations {
	static UserRegisterValidation() {
		return Joi.object({
			name: Joi.string()
				.min(3)
				.max(64)
				.required()
				.error(Error("Invalid name")),
			email: Joi.string()
				.required()
				.error(Error("Invalid email"))
				.pattern(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				),
			password: Joi.string()
				.min(3)
				.max(64)
				.required()
				.error(Error("Invalid password")),
		});
	}
	static UserLoginValidation() {
		return Joi.object({
			email: Joi.string()
				.required()
				.error(Error("Invalid email"))
				.pattern(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				),
			password: Joi.string()
				.min(3)
				.max(64)
				.required()
				.error(Error("Invalid password")),
		});
	}
};