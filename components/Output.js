import React from 'react';


const sample = {
	cmd: "ls -la",
	comment: "выводит список файлов в директории",
	status: "Завешено",
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

const history = Array(4).fill(sample);
 
const Input = ({newCommand = []}) => (
	<div className="well output-panel clearfix">
		{history.concat(newCommand).map(({cmd, print, comment, status}, i) => (
			<div key={i} className="list-group clearfix output-panel__item">
				<div className="panel panel-default col-lg-9 col-sm-7 output-panel__history">
					<div className="panel-heading output-panel__cmd">{status && <span className="output-panel__item__status">{status}</span>} {cmd}</div>
					<div className="panel-body output-panel__print">
						{print}
					</div>
				</div>
				<p className="col-lg-3 col-sm-5 output-panel__comment">
					{comment}
				</p>
			</div>
		))}
	</div>
);

export default Input;