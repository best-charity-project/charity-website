import React, { Component } from 'react';
import './TextField.css';

class TextField extends Component {
  render() {
 return(
 		<div>
 		<label htmlFor = {this.props.id}> </label>
			<input  type = {this.props.type} className = {this.props.nameClass} id = {this.props.id}  name = {this.props.name} placeholder = {this.props.placeholder}/> 
		</div>
		)
}
}

export default TextField;