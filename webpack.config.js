const webpack = require('webpack');

const common = {
	output: {
		path: __dirname + '/public',
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].async.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			include: [__dirname + '/client', __dirname + '/components'],
			
			loader: 'babel-loader',
			
			options: {
				cacheDirectory: true
			}
		}]
	},
	devtool: 'source-map'
};

module.exports = function(env) {
	return Object.assign({}, common, env === "production" ?
	{
		entry: {app: __dirname + '/client'},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			})
		]
	} :
	{
		entry: {app: [__dirname + '/client', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		]
	}
);
};