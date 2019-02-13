import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../Components/Admin/Auth';
import Logo from '../Menu/Logo';
import MenuLinks from '../Menu/MenuLinks';
import jwt_decode from "jwt-decode";

class Menu extends Component {

  state = {
    links: [
      {
        name: 'о нас',
        url: '/',
      },
      {
        name: 'новости',
        url: '/news',
      },
      {
        name: 'активности',
        child: [
          {
            name: 'проекты',
            icon: 'idea.svg',
            url: '/projects',
          },
          {
            name: 'события',
            url: '/events',
            icon: 'event.svg',
          },
        ],
      },
      {
        name: 'сообщества',
        child: [
          {
            name: 'образовательный маршрут',
            icon: 'idea.svg',
            url: '/education-way',
          },
          {
            name: 'найти контактное лицо',
            icon: 'idea.svg',
            url: '/education-way-people-list',
          },
        ],
      },
      {
        name: 'библиотека',
        url: '/library',
      },
      {
        name: 'контакты',
        url: '/contacts',
      },
    ],
    isUserAuth: false,
  };

  componentDidMount() {
    if (getToken() && getToken() !== 'undefined') {
      this.setState({
        isUserAuth: true
      });
    }
  }
  logOut = () => {
    window.localStorage.removeItem('token');
    window.location.replace('/');
  };

  showAdminLink() {
    if(!this.state.isUserAuth) return;
    const token = window.localStorage.getItem('token');
    const parsedToken = jwt_decode(token) || {};

    if(!parsedToken.admin) return;
    return <NavLink to={'/admin-panel/dashboard'}>Админпанель</NavLink>
  }

  render() {
    const { isUserAuth } = this.state;

    return (
      <div className="menu-wrapper">
        <div className={'menu ' + this.props.name}>
          <Logo client="true" />
          <MenuLinks list={this.state.links} className="menu-links-client" />
          <div className="user-name">
            {this.showAdminLink()}
            {
              isUserAuth ?
                <a onClick={e => this.logOut()}>Выйти</a>
              : <NavLink to={'/user-login'}>Войти</NavLink>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
