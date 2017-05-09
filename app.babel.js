require('babel-register')({
	ignore: /node_modules/,
	"presets": ["es2015", "react"]
});

module.exports = require("./app").default;