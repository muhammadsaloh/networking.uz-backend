const bcrypt = require("bcrypt");

module.exports.generateCrypt = async (data) => {
	return bcrypt.hash(data, await bcrypt.genSalt(10));
};

module.exports.compareCrypt = async (data, crypt) => {
	return bcrypt.compare(data, crypt);
};