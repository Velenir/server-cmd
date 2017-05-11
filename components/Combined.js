import React, {Component} from 'react';
import Output from "./Output";

class Combined extends Component {
	componentDidUpdate() {
		this.output.scrollTop = this.output.scrollHeight;
	}
	
	shouldComponentUpdate({cmdHistory: newHistory}) {
		const {cmdHistory, cmdHistory: {length}} = this.props;
		if(newHistory.length !== length
			|| (length && cmdHistory[length-1].end !== newHistory[length-1].end)) return true;
		
		return false;
	}
	
	getRef = (el) => {
		this.output = el;
	}
	
	render() {
		const {sendInput} = this.props;
		return (
			<div className="combine-panel">
				<div className="combined-panel__output" ref={this.getRef}>
					<Output {...this.props}/>
				</div>
				<form className="form-horizontal input-panel combined-panel__input" onSubmit={(e) => (e.preventDefault(), sendInput && sendInput(e))} autoComplete="off">
					<div className="input-panel__controls input-panel__controls--cmd">
						<div>
							<div className="col-lg-9 col-sm-7" style={{padding: 0}}>
								<input type="text" className="form-control input-panel__text" id="cmd" name="cmd" required placeholder="ls -la" autoFocus style={{flex: 2}}/>
							</div>
							<div className="col-lg-3 col-sm-5" style={{padding: 0, display:"flex"}}>
								<input type="text" rows="3" className="form-control input-panel__textarea" id="comment" name="comment" placeholder="список файлов" autoComplete="off" style={{flex: 1}}/>
								<button type="submit" className="btn btn-default input-panel__btn">Отправить</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Combined;