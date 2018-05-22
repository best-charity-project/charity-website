import React, { Component } from 'react';
import './input.css';

class Input extends Component {
  render() {
  	console.log(this.props)
 return(
 		<div>
 		<label htmlFor = {this.props.id}>{this.props.title}</label>
			<input  type = {this.props.type} className = {this.props.nameClass} id = {this.props.id}  name = {this.props.name} placeholder = {this.props.placeholder} onChange = {this.props.clickHandler}/> 
		</div>
		)
}
}

export default Input;