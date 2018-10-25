import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { server } from '../../api';
import { getToken } from '../../Components/Admin/Auth';
import Logo from '../Menu/Logo';
import MenuLinks from '../Menu/MenuLinks';

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
        name: 'контакты',
        url: '/contacts',
      },
    ],
    // username: '',
    isUserAuth: false,
  };

  componentDidMount() {
    if (getToken() && getToken() !== 'undefined') {
      this.setState({
        isUserAuth: true
      });
    }
  }

  render() {
    const { /* username, */ isUserAuth } = this.state;

    return (
      <div className="menu-wrapper">
        <div className={'menu ' + this.props.name}>
          <Logo client="true" />
          <MenuLinks list={this.state.links} className="menu-links-client" />
          <div className="user-name">  
            {
              isUserAuth ?
                <p>Вы успешно вошли</p>
              : <NavLink to={'/user-login'}>Войти</NavLink>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
