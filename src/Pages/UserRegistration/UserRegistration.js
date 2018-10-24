import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

import { signInUser, setToken, getToken } from '../../Components/Admin/Auth';
import {server} from '../../api';

import TextField from '../../Components/TextField/TextField';
import Button from '../../Components/Button/Button';
import './UserRegistration.css';

export default class UserRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            diagnosis: '',
            name: '',
            contactPerson: '',
            contacts: '',
            location: '',
            years: ''
        };
    }

    onChangeDiagnosis = (str) => {
      this.setState({ diagnosis: str })
    }

    onChangeName = (str) => {
      this.setState({ name: str })
    }

    onChangeContactPerson = (str) => {
      this.setState({ contactPerson: str })
    }

    onChangeContacts = (str) => {
      this.setState({ contacts: str })
    }

    onChangeLocation = (str) => {
      this.setState({ location: str })
    }

    onChangeYears = (str) => {
      this.setState({ years: str })
    }

    onChangeEmail = (str) => {
      this.setState({ email: str })
    }

    onChangePassword = (str) => {
      this.setState({ password: str })
    }

    handleSubmit = () => {
      axios({
        method: 'post',
        url: `${server}/api/user-auth/p`,
        data: this.state,
        config: { headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }},
      })
      .then(response => {
        this.props.history.push({
            pathname: '/'
        })  
    })
    }

    render() {
        return (
            <div className="registration-form-wrapper">
                <div className="registration-form-container">
                  <TextField 
                    label = "Диагноз:"
                    id = "user-diagnosis" 
                    type = "text"
                    name = "user-diagnosis"
                    value = {this.state.diagnosis}
                    onChangeValue = {this.onChangeDiagnosis}
                  />
                  <TextField 
                    label = "Имя:"
                    id = "user-name" 
                    type = "text"
                    name = "user-name"
                    value = {this.state.name}
                    onChangeValue = {this.onChangeName}
                  />
                  <TextField 
                    label = "Контактное лицо:"
                    id = "user-contact-person" 
                    type = "text"
                    name = "user-contact-person"
                    value = {this.state.contactPerson}
                    onChangeValue = {this.onChangeContactPerson}
                  />
                  <TextField 
                    label = "Контакты:"
                    id = "user-contacts" 
                    type = "text"
                    name = "user-contacts"
                    value = {this.state.contacts}
                    onChangeValue = {this.onChangeContacts}
                  />
                  <TextField 
                    label = "Ваш адрес(без дома и кв.):"
                    id = "user-location" 
                    type = "text"
                    name = "user-location"
                    value = {this.state.location}
                    onChangeValue = {this.onChangeLocation}
                  />
                  <TextField 
                    label = "годы поступления:"
                    id = "user-years" 
                    type = "text"
                    name = "user-years"
                    value = {this.state.years}
                    onChangeValue = {this.onChangeYears}
                  />
                  <TextField 
                    label = "Ваш E-mail:"
                    id = "user-years" 
                    type = "text"
                    name = "user-years"
                    value = {this.state.email}
                    onChangeValue = {this.onChangeEmail}
                  />
                  <TextField 
                    label = "Пароль:"
                    id = "user-years" 
                    type = "password"
                    name = "user-years"
                    value = {this.state.password}
                    onChangeValue = {this.onChangePassword}
                  />
                  <hr />
                </div>
                {/* <Link to ='/user-login'> */}
                  <Button
                    name = "button-admin button-admin-background" 
                    label = 'Подтвердить' 
                    clickHandler = {this.handleSubmit}
                  />
                {/* </Link> */}
            </div>
        );
    }
}