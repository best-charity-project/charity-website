import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from '../../ControlButton/ControlButton';
import './LoginPanel.css';

const LoginPanel = ({ userInfo, onLogout }) => {
  if (!userInfo.name) {
    return null;
  }
  return (
    <div className='login-panel'>
      <h1 className='login-panel--heading'>Привет, {userInfo.name}</h1>
      <ControlButton onButtonClick={onLogout} text='Выйти' className='login-panel--logout-btn' />
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
