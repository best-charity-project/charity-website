import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ControlButton from '../../ControlButton/ControlButton';
import './LoginPanel.css';

const LoginPanel = ({ userInfo, onLogout }) => {
  if (userInfo.name) {
    return (
      <div className='login-panel'>
        <div>
          <h1 className='login-panel--heading'>{userInfo.name}</h1>
          {userInfo.admin && (
            <Link className='login-panel--navigation' to='/admin'>
              Администратор
            </Link>
          )}
          {!userInfo.admin && (
            <Link className='login-panel--navigation' to='/account'>
              Кабинет
            </Link>
          )}
        </div>
        <ControlButton onButtonClick={onLogout} text='Выйти' className='login-panel--btn' />
      </div>
    );
  }
  return (
    <div className='login-panel'>
      <Link to='/login' className='login-panel--link'>
        Войти
      </Link>
    </div>
  );
};

export default LoginPanel;

LoginPanel.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};
