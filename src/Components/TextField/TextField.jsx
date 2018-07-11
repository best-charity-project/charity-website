import React, { Component } from 'react';
import './TextField.css';
import Error from "../ErrorEmail/ErrorEmail";
import '../ErrorEmail/ErrorEmail.css';

class TextField extends Component {
	state = {
		value:'',
		error:false,
	}
	

	valueChange = (e) => {
		const newValue = e.target.value;
		this.setState({value:e.target.value}, () =>{
			this.props.onChangeValue(this.state); 
		});
		this.validateField(newValue);	

	}
	validateField = (newValue) => {
		let resultValidation = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test(newValue);
		this.setState({error:resultValidation})
	}
    render() {
		console.log(this.props.required + this.props.label)
    	return(
 			<div className = 'container-for-input'> 
			 <form>
				 {this.props.label? <label htmlFor = {this.props.id}>{this.props.label}</label>: null}
				 {this.props.required? <input
					onKeyPress = {this.props.onKeyPress}
					value = {this.props.value}
					type = {this.props.type} 
					className = {this.props.nameClass} 
					id = {this.props.id}  
					name = {this.props.name} 
					placeholder = {this.props.placeholder} 
					onChange = {this.valueChange}
					onFocus = {this.props.onFocusInput} 
					required
					/> :<input
					onKeyPress = {this.props.onKeyPress}
					value = {this.props.value}
					type = {this.props.type} 
					className = {this.props.nameClass} 
					id = {this.props.id}  
					name = {this.props.name} 
					placeholder = {this.props.placeholder} 
					onChange = {this.valueChange}
					onFocus = {this.props.onFocusInput} 
					/>}
				{((this.props.sendToValidation)&&!(this.state.error))? <Error/> : null}
				</form>
			</div>
		)
	}
}

export default TextField;