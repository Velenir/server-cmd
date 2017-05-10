import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import Input from "./Input";
import Output from "./Output";

import {sendInput} from "../helpers";

class View extends Component {
	state = {}
	
	sendInput = ({target}) => {
		const formData = new FormData(target);
		sendInput(formData);
		
		this.setState({
			newCommand: {
				cmd: formData.get("cmd"),
				comment: formData.get("comment"),
				status: "В процессе"
			}
		});
	}
	
	render() {
		return (
			<div className="view">
				<Switch>
					{/* <Route path="/" exact render={() => <h2>Home</h2>}/> */}
					{/* <Redirect from="/" to="/input"/> */}
					<Route path="/input" render={() => <Input sendInput={this.sendInput}/>}/>
					<Route path="/output" render={() => <Output {...this.state}/>}/>
				</Switch>
			</div>
		);
	}
}

export default View;