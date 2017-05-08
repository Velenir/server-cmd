require('babel-register')({
	ignore: /node_modules/
});

module.exports = require("./app").default;