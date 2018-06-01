import React, { Component } from 'react';
import './TextField.css';
import Error from "../ErrorEmail/ErrorEmail";
import '../ErrorEmail/ErrorEmail.css';

class TextField extends Component {
	state = {
		value:null,
		error:false,
	}
	

	valueChange = (e) => {
		const newValue = e.target.value;
		this.setState({value:e.target.value}, () =>{
			this.props.onChangeValue(this.state.value); 
		});
		this.validateField(newValue);	

	}
	validateField = (newValue) => {
		let resultValidation = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test(newValue);
		this.setState({error:resultValidation})
	}
    render() {
    	return(
 			<div className = 'container-for-input'> 
 				<label htmlFor = {this.props.id}>{this.props.title}</label>
					<input  
					value = {this.props.value}
					type = {this.props.type} 
					className = {this.props.nameClass} 
					id = {this.props.id}  
					name = {this.props.name} 
					placeholder = {this.props.placeholder} 
					onChange = {this.valueChange}
					onFocus = {this.props.onFocusInput} 
					/> 
				{((this.props.sendToValidation)&&!(this.state.error))? <Error/> : null}
			</div>
		)
	}
}

export default TextField;