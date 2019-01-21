import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './Navigation.css';
import Button from '../Button/Button';
import { removeToken } from '../Admin/Auth/';
import Logo from '../Menu/Logo';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        removeToken();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="container-min">
                <Logo />
                <div className="buttons-container">
                <NavLink className="button-admin-to-main" to="/">На главную</NavLink>
                <Button label="Выйти" name="button-admin-exit" clickHandler={this.handleLogout} />
                </div>
            </div>
        );
    }
}
export default withRouter(Navigation);
