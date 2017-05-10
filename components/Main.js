import React from 'react';
import {Route, Link, Redirect, Switch} from "react-router-dom";
 
const Main = () => (
	<div>
		<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/input">input</Link></li>
			<li><Link to="/output">output</Link></li>
		</ul>
		<h2>Main react <a onClick={(e) => (e.preventDefault(), alert("Clicked!"))} href="#">component</a></h2>
		<Switch>
			{/* <Route path="/" exact render={() => <h2>Home</h2>}/> */}
			{/* <Redirect from="/" to="/input"/> */}
			<Route path="/input" render={() => <h3>Input</h3>}/>
			<Route path="/output" render={() => <h3>Output</h3>}/>
		</Switch>
	</div>
);

export default Main;