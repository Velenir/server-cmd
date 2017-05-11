import React, {Component} from 'react';
import NavListLink from "./NavListLink";

class Navigation extends Component {
	render() {
		return (
			<ul className="navigation nav nav-tabs nav-justified">
				<NavListLink to="/input">ВВОД</NavListLink>
				<NavListLink to="/output">ВЫВОД {this.props.updatesAvailable && <span className="badge navigation__new">new</span>}</NavListLink>
				<NavListLink to="/combined">КОМБИНИРОВАННЫЙ {this.props.updatesAvailable && <span className="badge navigation__new">new</span>}</NavListLink>
			</ul>
		);
	}
}

export default Navigation;