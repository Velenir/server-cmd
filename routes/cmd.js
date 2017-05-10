import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("RECEIVED query", req.query);
	res.json({
		query: req.query,
		q: req.query.q
	});
});

export default router;
