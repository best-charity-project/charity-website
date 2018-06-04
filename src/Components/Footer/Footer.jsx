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
			<span className = 'copyright'>&#169; </span>
				<NavLink to="/" className = 'link-on-main-page'> on-info</NavLink>
			<span>, {(new Date()).getFullYear()}</span>
  		</div>
    );
  }
}

export default Footer;