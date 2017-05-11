import express from 'express';
var router = express.Router();

import {exec} from 'child_process';

export const history = [];

router.get('/', function(req, res) {
	res.json(history);
});

router.post('/', function(req, res) {
	
	const cmdToRun = {
		cmd: req.form.cmd,
		comment: req.form.comment,
		status: "В процессе",
		start: Date.now()
	};
	
	res.json(cmdToRun);
	
	if(cmdToRun.cmd) runCmd(cmdToRun.cmd, (error, stdout, stderr) => {
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
			cb(error);
			return;
		}
		
		cb(null, stdout, stderr);
	});
}