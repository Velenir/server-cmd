import express from 'express';
const router = express.Router();

const React = require("react");
import {renderToString} from "react-dom/server";

import {StaticRouter} from "react-router";

import Main from "../components/Main";
import {history} from "./cmd";

router.get(['/', '/input', '/output', '/combined'], function(req, res) {
	
	const rendered = renderToString(
		<StaticRouter context={{}} location={req.originalUrl}>
			<Main cmdHistory={history}/>
		</StaticRouter>
	);
	
	res.render("index", {title: "Server CMD", rendered, preloadedHistory: history});
});

export default router;
