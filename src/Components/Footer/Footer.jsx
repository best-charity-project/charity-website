import React, { Component } from 'react';
import './Footer.css';
import {NavLink} from "react-router-dom";
import SocialLinks from '../Menu/SocialLinks'
class Footer extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
			<div className = {this.props.name +' footer'}>
				<div>
					<span className = 'copyright'>&#169; </span>
					<NavLink to="/" className = 'link-on-main-page'> on-info</NavLink>
					<span>, {(new Date()).getFullYear()}</span>
				</div>
				<SocialLinks />
		</div>
  	
    );
  }
}

export default Footer;