import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { server } from '../../api';
import { getToken } from '../../Components/Admin/Auth';
import Logo from '../Menu/Logo';
import MenuLinks from '../Menu/MenuLinks';

class Menu extends Component {
  constructor(props) {
    super(props);
  }
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
        name: 'контакты',
        url: '/contacts',
      },
    ],
    // email: '',
    isUserAuth: false,
  };

  componentDidMount() {
    if (getToken() && getToken() !== 'undefined') {
      this.setState({
        isUserAuth: true,
      });
    }
  }
  logOut = () => {
    window.localStorage.removeItem('token');
    window.location.replace('/');
  };

  render() {
    const { /* email, */ isUserAuth } = this.state;

    return (
      <div className="menu-wrapper">
        <div className={'menu ' + this.props.name}>
          <Logo client="true" />
          <MenuLinks list={this.state.links} className="menu-links-client" />
          <div className="user-name">
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
