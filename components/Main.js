import React, {Component} from 'react';
import Navigation from "./Navigation";
import View from "./View";


class Main extends Component {
	state = {updatesAvailable: false}
	
	gotUpdates = () => {
		this.setState({
			updatesAvailable: true
		});
	}
	
	clearedUpdates = () => {
		this.setState({
			updatesAvailable: false
		});
	}
	
	render() {
		return (
			<div className="app col-lg-offset-1 col-lg-10">
				<Navigation updatesAvailable={this.state.updatesAvailable}/>
				<View gotUpdates={this.gotUpdates} clearedUpdates={this.clearedUpdates}/>
			</div>
		);
	}
}

export default Main;