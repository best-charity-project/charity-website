import React, { Component } from 'react';
import './button.css';
class Button extends Component {
  render() {
    return ( 
<button className = {this.props.name} onClick = {this.props.clickHandler} type = {this.props.type}>{this.props.label} </button> 
    );
  }
}

export default Button;