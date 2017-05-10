import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import Main from "../components/Main";


// render(<Main/>, document.getElementById("app"));
render(
	<Router>
		<Main/>
	</Router>
	, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}