import express from 'express';
const router = express.Router();

const React = require("react");
import {renderToString} from "react-dom/server";
import Main from "../components/Main";

/* GET home page. */
router.get('/', function(req, res) {
	// res.render('index', { title: 'Express' });
	const rendered = renderToString(<Main/>);
	res.render("index", {title: "Express", rendered});
});

export default router;
