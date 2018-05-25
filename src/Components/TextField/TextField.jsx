import React, { Component } from 'react';
import './TextField.css';

class TextField extends Component {
	valueChange = (e)=>{
		let value = e.target.value;
		this.props.onChangeValue(value);
	}
  render() {
 return(
 		<div>
 		<label htmlFor = {this.props.id}>{this.props.title}</label>
			<input  
			type = {this.props.type} 
			className = {this.props.nameClass} 
			id = {this.props.id}  
			name = {this.props.name} 
			placeholder = {this.props.placeholder} 
			onChange = {this.valueChange}
			onFocus = {this.props.onFocusInput} 
			/> 
		</div>
		)
	}
}

export default TextField;