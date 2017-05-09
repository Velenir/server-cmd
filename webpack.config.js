const webpack = require('webpack');

module.exports = {
	entry: {
		app: __dirname + '/client'
	},
	output: {
		path: __dirname + '/public',
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].async.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [__dirname + '/client', __dirname + '/components'],
				
				loader: 'babel-loader',
				
				options: {
					cacheDirectory: true
				}
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
};