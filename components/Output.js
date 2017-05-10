import React from 'react';

const fontClasses = {
	"В процессе": "fa fa-spinner fa-spin",
	"Завершено": "fa fa-check",
	"Ошибка": "fa fa-exclamation-triangle"
};
 
const Input = ({history}) => (
	<div className="well output-panel clearfix">
		{history.map(({cmd, print, comment, status}, i) => (
			<div key={i} className="list-group clearfix output-panel__item">
				<div className="panel panel-default col-lg-9 col-sm-7 output-panel__history">
					<div className="panel-heading output-panel__cmd">
						{status && <i className={"output-panel__item__status " + fontClasses[status]} aria-hidden="true" title={status}/>} {cmd}
					</div>
					<div className="panel-body output-panel__print">
						{print}
					</div>
				</div>
				<p className="col-lg-3 col-sm-5 output-panel__comment">
					{comment}
				</p>
			</div>
		))}
	</div>
);

export default Input;