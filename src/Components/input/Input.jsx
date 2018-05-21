import React, { Component } from 'react';
import './input.css';

class Input extends Component {
  render() {
  	console.log(this.props)
 return(
 		<div>
 		<label htmlFor = {this.props.id}> </label>
			<input  className = {this.props.nameClass} id = {this.props.id} type = {this.props.type} name = {this.props.name} placeholder = {this.props.placeholder}/> 
		</div>
		)
}
}

export default Input;