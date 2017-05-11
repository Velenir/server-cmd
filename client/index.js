import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import Main from "../components/Main";

/* eslint-disable no-underscore-dangle */
// passed from render
console.log(window.__PRELOADED_HISTORY__);
const preloadedHistory = window.__PRELOADED_HISTORY__;
// allow to garbage collect
delete window.__PRELOADED_HISTORY__;
/* eslint-enable no-underscore-dangle */

render(
	<Router>
		<Main cmdHistory={preloadedHistory}/>
	</Router>
	, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}