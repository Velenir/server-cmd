import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import formdata from 'formdata-parser';
import sassMiddleware from 'node-sass-middleware';

import index from './routes/index';
import cmd from './routes/cmd';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(formdata());
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));


// in production assets are compiled by webpack in prestart
if(process.env.NODE_ENV !== "production") {
	const webpack = require('webpack');
	const webpackConfig = require('./webpack.config')(process.env.NODE_ENV);
	const compiler = webpack(webpackConfig);

	const webpackDevMiddleware = require('webpack-dev-middleware');

	app.use(webpackDevMiddleware(compiler, {publicPath: '/', noInfo: true}));
	app.use(require("webpack-hot-middleware")(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
}


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/cmd', cmd);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;
