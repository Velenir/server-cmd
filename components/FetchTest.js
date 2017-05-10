import React, {Component} from 'react';

class FetchTest extends Component {
	sendRequest(e) {
		e.preventDefault();
		
		fetch("/cmd?q=quest").then(res => {
			if(res.ok) return res.json();
			return Promise.reject({
				status: res.status,
				statusText: res.statusText
			});
		}).then(json => {
			console.log(JSON.stringify(json));
		}).catch(err => {
			console.error(err);
		});
	}
	
	render() {
		return (
			<a href="#" onClick={this.sendRequest}>Send request</a>
		);
	}
}

export default FetchTest;