import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
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
  keyDownAction(event) {
    if (event.ctrlKey == true && event.keyCode == 32) {
      console.log(event.keyCode);
      this.toggleClass();
    }
  }

  getImageClass() {
    return classnames('navigation--menu-image', {
      'navigation--menu-image--open': this.state.active,
    });
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <nav className='navigation'>
        <div
          className='navigation--menu'
          onClick={this.toggleClass}
          onKeyUp={this.keyDownAction}
          tabIndex='0'
          role='button'
        >
          <img className={this.getImageClass()} src={navMenuPicture} alt='Menu' />
          <Link to='/' className='navigation--menu--menu-element'>
            Home
          </Link>
          <Link to='/admin' className='navigation--menu--menu-element'>
            Admin
          </Link>
          <Link to='/about' className='navigation--menu--menu-element'>
            About
          </Link>
          <Link to='/news' className='navigation--menu--menu-element'>
            News
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navigation;
