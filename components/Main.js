import React from 'react';
import FetchTest from "./FetchTest";
import Navigation from "./Navigation";
import View from "./View";
 
const Main = () => (
	<div className="app col-lg-offset-1 col-lg-10">
		<FetchTest/>
		<Navigation/>
		<View/>
	</div>
);

export default Main;