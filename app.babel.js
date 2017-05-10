require('babel-register')({
	ignore: /node_modules/,
	"presets": ["es2015", "react"],
	plugins: ["transform-class-properties"]
});

module.exports = require("./app").default;