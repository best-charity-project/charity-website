import React, { Component } from 'react';
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
        ],
      },
      {
        name: 'контакты',
        url: '/contacts',
      },
    ],
  };
  render() {
    return (
      <div className="menu-wrapper">
        <div className={'menu ' + this.props.name}>
          <Logo client="true" />
          <MenuLinks list={this.state.links} className="menu-links-client" />
        </div>
      </div>
    );
  }
}

export default Menu;
