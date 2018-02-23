import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
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
    return classnames('navigation--button', {
      'navigation--button-open': this.state.active,
    });
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <nav className='navigation'>
        <ul className='navigation--menu'>
          <button className={this.getImageClass()} onClick={this.toggleClass} />
          <li>
            <Link onClick={this.setStateToFalse} to='/' className='navigation--element'>
              Главная
            </Link>
          </li>
          <li>
            <Link onClick={this.setStateToFalse} to='/Library' className='navigation--element'>
              Библиотека
            </Link>
          </li>
          <li>
            <Link onClick={this.setStateToFalse} to='/news' className='navigation--element'>
              Новости
            </Link>
          </li>
          <li>
            <Link onClick={this.setStateToFalse} to='/about' className='navigation--element'>
              О нас
            </Link>
          </li>
          <li>
            <Link onClick={this.setStateToFalse} to='/admin' className='navigation--element'>
              Администратор
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
