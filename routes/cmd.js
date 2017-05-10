import express from 'express';
var router = express.Router();

import {exec} from 'child_process';

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
		comment: req.form.comment,
		status: "В процессе",
		start: Date.now()
	});
	
	if(req.form.cmd) runCmd(req.form.cmd, (error, stdout, stderr) => {
		// res.json({
		// 	form: req.form,
		// 	cmd: req.form.cmd,
		// 	comment: req.form.comment,
		// 	error,
		// 	print: stderr || stdout
		// });
	});
});

export default router;


function runCmd(cmd, cb) {
	exec(cmd, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			cb(error);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		
		cb(null, stdout, stderr);
	});
}