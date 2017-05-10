import express from 'express';
const router = express.Router();

const React = require("react");
import {renderToString} from "react-dom/server";

import {StaticRouter} from "react-router";

import Main from "../components/Main";

/* GET home page. */
router.get(['/', '/input', '/output'], function(req, res) {
	const context = {};
	
	const rendered = renderToString(
		<StaticRouter location={req.originalUrl} context={context}>
			<Main/>
		</StaticRouter>
	);
	
	// Will redirect proper, not a history only change by react-router
	// may not actually want to do it
	// req.originalUrl !== context.url prevents infinite redirects when already there
	// if(context.url && req.originalUrl !== context.url) {
	// 	console.log("REDIRECTING from", req.originalUrl, "to", context.url);
	// 	res.status(301).location(context.url).end();
	// 	return;
	// }
	
	res.render("index", {title: "Express", rendered});
});

export default router;
