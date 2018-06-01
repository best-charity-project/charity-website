import React, { Component } from 'react';
import './Menu.css';
import logo from "../../Assets/AssetsSvg/on-info-logo.svg"

class Logo extends Component {
  render() {
    return (
      <div className = 'logo' > 
        <img src = {logo} alt = 'logo' />
      </div>
    );
  }
}

export default Logo;