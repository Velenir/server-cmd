import React, {Component} from 'react';

const fontClasses = {
	"В процессе": "fa fa-spinner fa-spin",
	"Завершено": "fa fa-check",
	"Ошибка": "fa fa-exclamation-triangle"
};

class Output extends Component {
	componentDidMount() {
		console.log("Output MOUNTED");
		this.props.clearedUpdates();
	}
	componentDidUpdate() {
		console.log("Output UPDATED");
	}
	render() {
		return (
			<div className="well output-panel clearfix">
				<a href="#" className="output-panel__scroll-to-bottom" onClick={(e) => (e.preventDefault(), document.body.scrollTop = document.body.scrollHeight)}>
					<i className="fa fa-arrow-down"/>
				</a>
				{this.props.history.map(({cmd, print, comment, status, error}, i) => (
					<div key={i} className="list-group clearfix output-panel__item">
						<div className="panel panel-default col-lg-9 col-sm-7 output-panel__history">
							<div className="panel-heading output-panel__cmd">
								{status && <i className={"output-panel__item__status " + fontClasses[status]} aria-hidden="true" title={error || status}/>} {cmd}
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
	}
}

export default Output;