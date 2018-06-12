import React, { Component } from 'react';
import './Menu.css';
import {NavLink} from "react-router-dom";
import logo from "../../Assets/AssetsSvg/on-info-logo.svg"

class Logo extends Component {
  render() {
    return (
      <div className = 'logo' >
        {this.props.name === 'client-logo' ? 
          <NavLink to ='/'>
           <img src = {logo} alt = 'logo' />
          </NavLink>: 
          <NavLink to ='/admin-panel/dashboard'>
            <img src = {logo} alt = 'logo' />
        </NavLink> }       
      </div>
    );
  }
}

export default Logo;