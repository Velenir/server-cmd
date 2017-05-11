import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Input from "./Input";
import Output from "./Output";
import Combined from "./Combined";
import UpdateButton from "./UpdateButton";

import {sendInput, requestUpdate} from "../helpers";

class View extends Component {
	state = {cmdHistory: this.props.cmdHistory || [], interval: false}
	
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
				console.error(err);
				return {
					...newCommand,
					status: "Ошибка",
					error: err.statusText || err.message,
					start: Date.now(),
					clientTime: true
				};
			}).then((cmd) => {
				this.props.gotUpdates();
				this.setState({
					cmdHistory: [...this.state.cmdHistory, cmd]
				});
			});
	}
	
	requestUpdate = () => {
		requestUpdate().then(newHistory => {
			const {cmdHistory, cmdHistory: {length}} = this.state;
			if(newHistory.length !== length
				|| (length && cmdHistory[length-1].end !== newHistory[length-1].end))
			{
				this.props.gotUpdates();
				this.setState({cmdHistory: newHistory});
			}
			
		});
	}
	
	automaticUpdate = ({target}) => {
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
					<Route path="/input" render={() => <Input sendInput={this.sendInput}/>}/>
					<Route path="/output" render={() => <Output cmdHistory={this.state.cmdHistory} clearedUpdates={this.props.clearedUpdates}/>}/>
					<Route path="/combined" render={() => <Combined sendInput={this.sendInput} cmdHistory={this.state.cmdHistory} clearedUpdates={this.props.clearedUpdates}/>}/>
					<Redirect from="/" to="/output"/>
				</Switch>
			</div>
		);
	}
}

export default View;