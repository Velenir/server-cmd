import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import Input from "./Input";
import Output from "./Output";

class View extends Component {
	render() {
		return (
			<div className="view">
				<Switch>
					{/* <Route path="/" exact render={() => <h2>Home</h2>}/> */}
					{/* <Redirect from="/" to="/input"/> */}
					<Route path="/input" component={Input}/>
					<Route path="/output" component={Output}/>
				</Switch>
			</div>
		);
	}
}

export default View;