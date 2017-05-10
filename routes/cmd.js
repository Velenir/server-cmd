import express from 'express';
var router = express.Router();

import {exec} from 'child_process';

const history = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("SENDING history");
	res.json(history);
});

router.post('/', function(req, res, next) {
	console.log("RECEIVED form", req.form);
	
	const cmdToRun = {
		cmd: req.form.cmd,
		comment: req.form.comment,
		status: "В процессе",
		start: Date.now()
	};
	
	res.json(cmdToRun);
	
	if(cmdToRun.cmd) runCmd(cmdToRun.cmd, (error, stdout, stderr) => {
		console.log(typeof error);
		history.push({
			...cmdToRun,
			error: error && error.message,
			print: stderr || stdout,
			end: Date.now(),
			status: error ? "Ошибка" : "Завершено"
		});
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