import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import Input from "./Input";
import Output from "./Output";

import {sendInput} from "../helpers";

class View extends Component {
	sendInput({target}) {
		const formData = new FormData(target);
		sendInput(formData);
	}
	
	render() {
		return (
			<div className="view">
				<Switch>
					{/* <Route path="/" exact render={() => <h2>Home</h2>}/> */}
					{/* <Redirect from="/" to="/input"/> */}
					<Route path="/input" render={() => <Input sendInput={this.sendInput}/>}/>
					<Route path="/output" component={Output}/>
				</Switch>
			</div>
		);
	}
}

export default View;