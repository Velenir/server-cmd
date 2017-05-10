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

router.post('/', function(req, res, next) {
	console.log("RECEIVED form", req.form);
	res.json({
		form: req.form,
		cmd: req.form.cmd,
		comment: req.form.comment
	});
});

export default router;
