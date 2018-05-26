import React, { Component } from 'react';
import './SubscribtionForm.css';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import Error from "../ErrorEmail/ErrorEmail";
import '../ErrorEmail/ErrorEmail.css';

class SubscribtionForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      error:true
    }
  }

 onFocusInput = () => {
   this.setState({error:true})
 }
 
  getValue = (str) => {
    const newValue = str;
    this.setState({value:newValue});
  }

  clickHandler = (e) => {
    if(this.validation()){
      this.setState({value:''})
    }
  }

  validation = () => {
    const newValue = this.state.value;
    if(/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test(newValue)){
      this.setState({error: /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test(newValue)});
      return true;
    }else{
        this.setState({error: /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test(newValue)});
        return false;
      }
  }

  render() {
    return (
      <div className = 'subscribtion-form'> 
          <div className = 'wrapper-input'>         
            <TextField 
              type = 'email' 
              nameClass = 'input-email' 
              placeholder = "Введите адрес электронной почты" 
              name = 'email' 
              onChangeValue = {this.getValue}
              onFocusInput = {this.onFocusInput}
              value = {this.state.value}
             />
            {!(this.state.error) ?  <Error /> : null }
          </div>
          <Button name = 'button-subscribe' 
            label = "подписаться" 
            clickHandler = {this.clickHandler}/>
      </div>
    );
  }
}

export default SubscribtionForm ;