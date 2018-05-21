import React, { Component } from 'react';
import './input.css';

class Input extends Component {
  render() {
  	console.log(this.props)
 return(
 		<div>
 		<label htmlFor = {this.props.id}> </label>
			<input  type = {this.props.type} className = {this.props.nameClass} id = {this.props.id}  name = {this.props.name} placeholder = {this.props.placeholder}/> 
		</div>
		)
}
}

export default Input;