import React, { Component } from 'react';
import axios from 'axios';
import ToastrContainer, { ToastDanger } from 'react-toastr-basic'

import { server } from '../../api';

import Button from '../../Components/Button/Button';
import { signInUser, setToken } from '../../Components/Admin/Auth';
import './UserLogin.css';

export default class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      registrationForm: {
        email: '',
        password: '',
        repeatedPassword: ''
      },
      showModalWindow: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this);
  }

  handleLogin(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onChangeEmail = (str) => {
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        email: str.target.value
      }
    })
  }

  onChangePassword = (str) => {
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        password: str.target.value
      }
    })
  }

  onChangeRepeatedPassword = (str) => {
    this.setState({
      registrationForm: {
        ...this.state.registrationForm,
        repeatedPassword: str.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    signInUser(this.state)
      .then(response => {
        setToken(response.data);
        this.props.history.length === 0 ?
          this.props.history.push('/')
        : this.props.history.goBack();
      })
      .catch(err => console.log(err));
  }

  handleSubmitRegistration = () => {
    const { registrationForm } = this.state;

    if (registrationForm.password === registrationForm.repeatedPassword) {
      axios({
        method: 'post',
        url: `${ server }/api/user-auth/p`,
        data: registrationForm,
        config: { headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }}
      }) 
      .then(res => {
        this.setState({
          showModalWindow: false
        });
      })
    } else this.showToast()
  }

  showRegistrationModalWindow = () => {
    this.setState({
      showModalWindow: true
    });
  }

  hideAddPointModal = () => {
    this.setState({
      showModalWindow: false
    });
  } 

  showToast = () => {
    ToastDanger('Пароли не совпадают между собой!');
  }

  render() {
    const { showModalWindow } = this.state;

    return (
      <div className="wrapper-user auth-form">
        {
          showModalWindow ? (
            <div>
              <div className="user-registration-overlay" />
              <div className="user-registration-modal-window">
                <div className="modal-window-head" onClick={this.hideAddPointModal}>
                  <a className="close-icon"/>
                </div>
                <div className="modal-window-body">
                  <input
                    type="text"
                    placeholder="Введите e-mail"
                    name="registration-email"
                    required
                    className="registration-email"
                    onChange={this.onChangeEmail}
                  />
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    name="registration-password"
                    required
                    className="registration-password"
                    onChange={this.onChangePassword}
                  />
                  <input
                    type="password"
                    placeholder="Введите повторно пароль"
                    name="registration-repeated-password"
                    required
                    className="registration-repeated-password"
                    onChange={this.onChangeRepeatedPassword}
                  />
                  <div className="registration-button-container">
                    <Button
                      name = "button-user-registration button-user-registration-cancel" 
                      label = 'Отменить' 
                      clickHandler = {this.hideAddPointModal}
                    />
                    <Button
                      name = "button-user-registration button-user-registration-done" 
                      label = 'Подтвердить' 
                      clickHandler = {this.handleSubmitRegistration}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) 
          : null
        }    
        <ToastrContainer />    
        <form className="user-form" onSubmit={this.handleSubmit}>
          <div className="container-user">
            <div className="username-div">
              <input
                type="text"
                placeholder="Введите e-mail"
                name="username"
                required
                className="username-input"
                onChange={this.handleLogin}
              />
            </div>

            <div className="password-div">
              <input
                type="password"
                placeholder="Введите пароль"
                name="password"
                required
                className="password-input"
                onChange={this.handlePassword}
              />
            </div>         
            <Button type="submit" name="button-admin-login" label="Войти" />
            <div className="login-registration-form">
              <label>Нет аккаунта?</label>
              <input className="login-registration-button" type="button" value="Регистрация" onClick={this.showRegistrationModalWindow} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}