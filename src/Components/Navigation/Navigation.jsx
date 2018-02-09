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
    this.state = {
      active: false,
    };
  }

  getImageClass() {
    return classnames('menu-image', {
      'menu-image-open': this.state.active,
    });
  }

  keyDownAction(event) {
    if (event.ctrlKey === true && event.keyCode === keysValue.spaceScanCode) {
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
        <div
          title='&quot;ctrl+space&quot; for open menu'
          className='navigation--menu'
          onClick={this.toggleClass}
          onKeyUp={this.keyDownAction}
          tabIndex='0'
          role='button'
        >
          <img className={this.getImageClass()} src={navMenuPicture} alt='Menu' />
          <Link to='/' className='menu--element'>
            Home
          </Link>
          <Link to='/admin' className='menu--element'>
            Admin
          </Link>
          <Link to='/about' className='menu--element'>
            About
          </Link>
          <Link to='/news' className='menu--element'>
            News
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navigation;
