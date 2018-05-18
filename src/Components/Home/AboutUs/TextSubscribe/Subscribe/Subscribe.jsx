import React, { Component } from 'react';
 import './Subscribe.css';
 import Input from '../../../../input/Input'
  import Button from '../../../../button/button'

class Subscribe extends Component {
  render() {
    return (
  <div className = 'Subscribe'> 
      <div className = 'wrapper_input'>
        <Input type = 'email' name = 'input_email' placeholder = "Введите адрес электронной почти"/>
      </div>
      <Button name = 'button_subscribe' label = "ПОДПИСАТЬСЯ"/>
  </div>
    );
  }
}

export default Subscribe;