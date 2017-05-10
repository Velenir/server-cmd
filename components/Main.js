import React from 'react';
import FetchTest from "./FetchTest";
import Navigation from "./Navigation";
import View from "./View";
 
const Main = () => (
	<div className="app">
		<FetchTest/>
		<Navigation/>		
		<View/>
	</div>
);

export default Main;