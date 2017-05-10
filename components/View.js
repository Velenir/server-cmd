import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Input from "./Input";
import Output from "./Output";
import UpdateButton from "./UpdateButton";

import {sendInput, requestUpdate} from "../helpers";

class View extends Component {
	state = {cmdHistory: this.props.cmdHistory || [], interval: true}
	
	componentDidMount() {
		if(this.state.interval) {
			const interval = setInterval(this.requestUpdate, 1000);
			this.setState({interval});
		}
	}
	
	sendInput = ({target: form}) => {
		const formData = new FormData(form);
		const newCommand = {
			cmd: formData.get("cmd"),
			comment: formData.get("comment")
		};
		
		form.reset();
		
		sendInput(formData)
			.catch((err) => {
				console.log(err);
				return {
					...newCommand,
					status: "Ошибка",
					error: err.statusText || err.message,
					start: Date.now()
				};
			}).then((cmd) => {
				this.setState({
					cmdHistory: [...this.state.cmdHistory, cmd]
				});
				this.props.gotUpdates();
			});
	}
	
	requestUpdate = () => {
		requestUpdate().then(newHistory => {
			console.log("RECEIVED update", newHistory, typeof newHistory);
			const {cmdHistory, cmdHistory: {length}} = this.state;
			if(newHistory.length !== length
				|| (length && cmdHistory[length-1].start !== newHistory[length-1].start))
			{
				this.props.gotUpdates();
			}
			this.setState({cmdHistory: newHistory});
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
					<Route path="/output" render={() => <Output cmdHistory={this.state.cmdHistory} clearedUpdates={this.props.clearedUpdates}/>}/>
				</Switch>
			</div>
		);
	}
}

export default View;