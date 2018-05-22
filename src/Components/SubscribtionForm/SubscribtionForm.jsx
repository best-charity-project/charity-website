import React, { Component } from 'react';
import './SubscribtionForm.css';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';

class SubscribtionForm extends Component {
  render() {
    return (
      <div className = 'subscribtion-form'> 
          <div className = 'wrapper-input'>
            <TextField type = 'email' nameClass = 'input-email' placeholder = "Введите адрес электронной почты" name = 'email'/>
          </div>
          <Button name = 'button-subscribe'  label = "подписаться"/>
      </div>
    );
  }
}

export default SubscribtionForm ;