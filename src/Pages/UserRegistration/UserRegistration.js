import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link } from 'react-router-dom';

import Button from '../../Components/Button/Button';
import { signInUser, setToken, getToken } from '../../Components/Admin/Auth';
import './UserRegistration.css';

export default class UserRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="wrapper-user auth-form">
                <form className="user-form" onSubmit={this.handleSubmit}>
                    <div className="container-user">
                        <div className="username-div">
                            <input
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                required
                                className="username-input"
                                onChange={this.handleLogin}
                            />
                        </div>

                        <div className="password-div">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                required
                                className="password-input"
                                onChange={this.handlePassword}
                            />
                        </div>

                        <Button type="submit" name="button-admin-login" label="Войти" />
                    </div>
                </form>
            </div>
        );
    }
}