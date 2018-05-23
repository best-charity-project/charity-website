import React, { Component } from 'react';
import './SubscribtionForm.css';
import TextField from '../TextField/TextField';
import Button from '../Button/Butt';
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
    this.validation();
  }

  validation = () => {
    const newValue = this.state.value;
      this.setState({error: /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test(newValue)})
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
             />
            {!(this.state.error) ?  <Error />: null }
          </div>
          <Button name = 'button-subscribe' 
            label = "подписаться" 
            clickHandler = {this.clickHandler}/>
      </div>
    );
  }
}

export default SubscribtionForm ;