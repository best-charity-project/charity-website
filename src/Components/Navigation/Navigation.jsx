/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import keysValue from '../../config/keysValue.json';
import navMenuPicture from '../img/NavMenu.svg';
import './Navigation.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.keyDownAction = this.keyDownAction.bind(this);
    this.setStateToFalse = this.setStateToFalse.bind(this);
    this.state = {
      active: false,
    };
  }
  setStateToFalse() {
    this.setState({ active: false });
  }

  getImageClass() {
    return classnames('menu-image', {
      'menu-image-open': this.state.active,
    });
  }

  keyDownAction(event) {
    if (event.ctrlKey && event.keyCode === keysValue.spaceScanCode) {
      this.toggleClass();
    }
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <nav className='navigation'>
        <div title='&quot;ctrl+space&quot; for open menu' className='navigation--menu'>
          <img
            className={this.getImageClass()}
            onClick={this.toggleClass}
            onKeyUp={this.keyDownAction}
            src={navMenuPicture}
            alt='Menu'
            tabIndex='0'
            role='button' // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
          />
          <Link onClick={this.setStateToFalse} to='/' className='menu--element'>
            Главная
          </Link>
          <Link onClick={this.setStateToFalse} to='/admin' className='menu--element'>
            Admin
          </Link>
          <Link onClick={this.setStateToFalse} to='/about' className='menu--element'>
            О нас
          </Link>
          <Link onClick={this.setStateToFalse} to='/news' className='menu--element'>
            Новости
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navigation;
