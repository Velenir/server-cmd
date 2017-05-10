import React from 'react';
 
const UpdateButton = ({requestUpdate, automaticUpdate, interval}) => (
	<div className="view__update">
		<a href="#" onClick={(e) => (e.preventDefault(), requestUpdate())} className="view__update__btn">
			<i className="fa fa-refresh" aria-hidden="true"/>
		</a>
		<label className="view__update__interval">
			<input type="checkbox" checked={interval} onChange={automaticUpdate}/> <small>1 сек</small>
		</label>
	</div>
);

export default UpdateButton;