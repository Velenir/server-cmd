import React from "react";
import {render} from "react-dom";

import Main from "../components/Main";


render(<Main/>, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}