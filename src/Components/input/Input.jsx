import React, { Component } from 'react';
import './input.css';

class Input extends Component {
  render() {
 return(
			<input  className = {this.props.name}/> 
		)
}
}

export default Input;