import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import Input from "./Input";
import Output from "./Output";
import UpdateButton from "./UpdateButton";

import {sendInput, requestUpdate} from "../helpers";

const sample = {
	cmd: "ls -la",
	comment: "выводит список файлов в директории",
	status: "Завершено",
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

class View extends Component {
	state = {history, interval: false}
	
	sendInput = ({target: form}) => {
		const formData = new FormData(form);
		const newCommand = {
			cmd: formData.get("cmd"),
			comment: formData.get("comment"),
			status: "В процессе"
		};
		
		form.reset();
		
		sendInput(formData).then(() => newCommand)
		.catch((err) => {
			console.log(err);
			return {
				...newCommand,
				status: "Ошибка",
				error: err.statusText || err.message
			};
		}).then((cmd) => {
			this.setState({
				history: [...this.state.history, cmd]
			});
			this.props.gotUpdates();
		});
	}
	
	requestUpdate = () => {
		requestUpdate().then(history => {
			console.log("RECEIVED update", history);
			// this.setState({history});
		});
	}
	
	automaticUpdate = ({target}) => {
		console.log(target.checked);
		if(target.checked) {
			const interval = setInterval(this.requestUpdate, 1000);
			this.setState({interval});
			
		} else {
			clearInterval(this.state.interval);
			this.setState({interval: false});
		}
	}
	
	componentWillUnmount() {
		clearInterval(this.state.interval);
	}
	
	render() {
		return (
			<div className="view">
				<UpdateButton requestUpdate={this.requestUpdate} automaticUpdate={this.automaticUpdate} interval={this.state.interval}/>
				<Switch>
					{/* <Route path="/" exact render={() => <h2>Home</h2>}/> */}
					{/* <Redirect from="/" to="/input"/> */}
					<Route path="/input" render={() => <Input sendInput={this.sendInput}/>}/>
					<Route path="/output" render={() => <Output history={this.state.history} {...this.props}/>}/>
				</Switch>
			</div>
		);
	}
}

export default View;