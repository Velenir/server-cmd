import React from 'react';
import {Route, Link} from "react-router-dom";
 
const NavListLink = ({
	to,
  exact,
  strict,
  location,
  activeClassName = "active",
  className,
  activeStyle,
  style,
  isActive: getIsActive,
  ...rest
}) => (
	<Route
		path={typeof to === 'object' ? to.pathname : to}
    exact={exact}
    strict={strict}
    location={location}
		// eslint-disable-next-line react/no-children-prop
		children={({match, location}) => {
			const isActive = !!(getIsActive ? getIsActive(match, location) : match);
			return (
				<li style={isActive ? { ...style, ...activeStyle } : style}
					className={isActive ? (className ? className + " " : "") + activeClassName : className}>
					<Link to={to} {...rest}/>
				</li>
			);
		}}/>
);

export default NavListLink;