import React, {Component} from 'react';
import NavListLink from "./NavListLink";

class Navigation extends Component {
	render() {
		return (
			<ul className="navigation nav nav-tabs nav-justified">
				<NavListLink exact to="/">Home</NavListLink>
				<NavListLink to="/input">input</NavListLink>
				<NavListLink to="/output">output {this.props.updatesAvailable && <span className="badge navigation__new">new</span>}</NavListLink>
			</ul>
		);
	}
}

export default Navigation;