import express from 'express';
var router = express.Router();

import {exec} from 'child_process';

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

const sample = {
	cmd: "ls -la",
	comment: "выводит список файлов в директории",
	status: "Завершено",
	start: Date.now(),
	end: Date.now()+2000,
	print: `total 100
drwxr-xr-x  10 velenir velenir  4096 May 10 12:47 .
drwxr-xr-x   7 velenir velenir  4096 May 10 11:12 ..
-rw-r--r--   1 velenir velenir   132 May 10 12:52 app.babel.js
-rw-r--r--   1 velenir velenir  1981 May 10 00:28 app.js
-rw-r--r--   1 velenir velenir   105 May 10 12:52 .babelrc
drwxr-xr-x   2 velenir velenir  4096 May  8 23:26 bin
drwxr-xr-x   2 velenir velenir  4096 May  9 00:44 client
drwxr-xr-x   2 velenir velenir  4096 May 10 12:22 components
-rw-r--r--   1 velenir velenir  1082 May  8 22:53 .eslintrc
drwxr-xr-x   8 velenir velenir  4096 May 10 14:08 .git
-rw-r--r--   1 velenir velenir   617 May 10 12:56 .gitignore
drwxr-xr-x 685 velenir velenir 28672 May 10 12:47 node_modules
-rw-r--r--   1 velenir velenir  1383 May 10 12:47 package.json
drwxr-xr-x   5 velenir velenir  4096 May  9 11:58 public
drwxr-xr-x   2 velenir velenir  4096 May 10 00:28 routes
-rw-r--r--   1 velenir velenir   496 Feb 27 22:27 .stylelintrc
drwxr-xr-x   2 velenir velenir  4096 May  9 10:16 views
-rw-r--r--   1 velenir velenir   900 May  9 16:52 webpack.config.js
`
};

export const history = Array(4).fill(sample);


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