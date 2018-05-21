import React, { Component } from 'react';
 import './Subscribe.css';
 import Input from '../../../../input/Input'
  import Button from '../../../../button/button'

class Subscribe extends Component {
  render() {
    return (
  <div className = 'subscribe'> 
      <div className = 'wrapper-input'>
        <Input type = 'email' nameClass = 'input-email' placeholder = "Введите адрес электронной почти" name = 'email'/>
      </div>
      <Button name = 'button-subscribe' label = "подписаться"/>
  </div>
    );
  }
}

export default Subscribe;