import React, { Component } from 'react';
import './Footer.css';
import Home from '../../../Components/Home/MainPage';

import {Link,Switch,NavLink} from "react-router-dom";
// const Link = ReactRouterDOM.Link;
class Footer extends Component {
	constructor(props){
		super(props);
		this.state = {date: new Date()}
	}
  render() {
    return (
  <div className = 'footer'> 
<span>&#169; </span>
			 
				 <div className = "link-on-main-page">
					<NavLink to="/"> on-info</NavLink>
				</div>
		
			<span>, {this.state.date.getFullYear()}</span>
  </div>
    );
  }
}

export default Footer;