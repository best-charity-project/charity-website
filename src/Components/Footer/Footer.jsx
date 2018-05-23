import React, { Component } from 'react';
import './Footer.css';
import {Link,Switch,NavLink} from "react-router-dom";

class Footer extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
  		<div className = 'footer-client'> 
			<span>&#169; </span>
			<div className = "link-on-main-page">
				<NavLink to="/"> on-info</NavLink>
			</div>
			<span>, {(new Date()).getFullYear()}</span>
  		</div>
    );
  }
}

export default Footer;