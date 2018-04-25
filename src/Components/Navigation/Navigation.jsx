import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NavigationList from './NavigationList';
import LoginPanel from './LoginPanel/LoginPanel';
import { forumURL } from '../../configs/config.json';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.setStateToFalse = this.setStateToFalse.bind(this);
    this.state = {
      isActive: false,
    };
    this.logout = this.logout.bind(this);
  }

  setStateToFalse() {
    this.setState({ isActive: false });
  }

  getImageClass() {
    return classnames('navigation--button', {
      'navigation--button-open': this.state.isActive,
    });
  }

  toggleClass() {
    this.setState({ isActive: !this.state.isActive });
  }

  logout() {
    this.props.onLogout();
  }

  render() {
    return (
      <nav className='navigation'>
        <div className='navigation--menu'>
          <button className={this.getImageClass()} onClick={this.toggleClass} />
          <ul className='navigation--menu-wrapper'>
            <li className='menu--element'>
              <button className='menu--login-pannel' onClick={this.setStateToFalse}>
                <LoginPanel onLogout={this.logout} {...this.props} />
              </button>
            </li>
            <li className='menu--element menu--website-name'>
              <p className='element--navigation navigation--website-name'>ON-INFO.BY</p>
            </li>
            <NavigationList {...this.props} onClick={this.setStateToFalse} />
            <li className='menu--element'>
              <a className='element--navigation' target='_blank' href={forumURL}>
                Форум
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;

Navigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
