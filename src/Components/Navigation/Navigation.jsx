/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import navMenuPicture from '../img/NavMenu.svg';
import './Navigation.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.setStateToFalse = this.setStateToFalse.bind(this);
    this.state = {
      active: false,
    };
  }
  setStateToFalse() {
    this.setState({ active: false });
  }

  getImageClass() {
    return classnames('menu-image-wrapper', {
      'image-wrapper-open': this.state.active,
    });
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <nav className='navigation'>
        <div className='navigation--menu'>
          <div
            className={this.getImageClass()}
            onClick={this.toggleClass}
            tabIndex='0'
            role='button'
          >
            <img src={navMenuPicture} alt='Menu' className='menu-image' />
          </div>
          <Link onClick={this.setStateToFalse} to='/' className='menu--element'>
            Главная
          </Link>
          <Link onClick={this.setStateToFalse} to='/Library' className='menu--element'>
            Библиотека
          </Link>
          <Link onClick={this.setStateToFalse} to='/news' className='menu--element'>
            Новости
          </Link>
          <Link onClick={this.setStateToFalse} to='/about' className='menu--element'>
            О нас
          </Link>
          <Link onClick={this.setStateToFalse} to='/admin' className='menu--element'>
            Admin
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navigation;
