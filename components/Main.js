import React from 'react';
 
const Main = () => (
	<div>
		<h2>Main react <a onClick={(e) => (e.preventDefault(), alert("Clicked!"))} href="#">component</a></h2>
	</div>
);

export default Main;