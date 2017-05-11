import React, {PureComponent} from 'react';

const fontClasses = {
	"В процессе": "fa fa-spinner fa-spin",
	"Завершено": "fa fa-check",
	"Ошибка": "fa fa-exclamation-triangle"
};

const formatDate = mls => new Date(mls).toLocaleTimeString("ru-RU", {hour12: false});

const generatePrint = ({cmd, print, comment, status, error, start, end, clientTime}, i) => (
	<div key={i} className="list-group clearfix output-panel__item">
		<div className="panel panel-default col-lg-9 col-sm-7 output-panel__history">
			<div className="panel-heading output-panel__cmd">
				{status && <i className={"output-panel__item__status " + fontClasses[status]} aria-hidden="true" title={status}/>}
				<span className="output-panel__item__time" title={clientTime ? "Время клиента" : "Время на сервере"}>
					<i className="fa fa-clock-o" aria-hidden="true"/>
					{start && formatDate(start)}
					{start && end && " -- "}
					{end && formatDate(end)}
				</span>
				{cmd}
			</div>
			<div className="panel-body output-panel__print">
				{error || print}
			</div>
		</div>
		<p className="col-lg-3 col-sm-5 output-panel__comment">
			{comment}
		</p>
	</div>
);

class Output extends PureComponent {
	componentDidMount() {
		this.props.clearedUpdates();
	}
	componentDidUpdate() {
		this.props.clearedUpdates();
	}
	render() {
		return (
			<div className="well output-panel clearfix">
				<a href="#" className="output-panel__scroll-to-bottom"
					onClick={(e) => (e.preventDefault(), document.body.scrollTop = document.body.scrollHeight)}
					title="В конец страницы">
					<i className="fa fa-arrow-down" aria-hidden="true"/>
				</a>
				{this.props.cmdHistory.map(generatePrint)}
			</div>
		);
	}
}

export default Output;