import React from 'react';
import PropTypes from 'prop-types';
import confirmPassword from '../Form/confirmPassword';
import { minPasswordLength } from '../../configs/config.json';
import './ChangePasswordForm.css';

export default class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      confirmPassword: '',
      newPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
  }

  handleConfirmPasswordChange() {
    this.setState({ confirmPassword: this.confirmPassword.value });
    confirmPassword(this.newPassword, this.confirmPassword);
  }

  handleOldPasswordChange(e) {
    this.setState({
      oldPassword: e.target.value,
    });
  }

  handleNewPasswordChange(e) {
    this.setState({
      newPassword: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { oldPassword, newPassword } = this.state;
    this.props.onSubmit({ oldPassword, newPassword });
  }

  render() {
    return (
      <div className='changePasswordForm form'>
        <form name='changePasswordForm' onSubmit={this.handleSubmit}>
          <div className='form--box'>
            <input
              id='oldPassword'
              value={this.state.oldPassword}
              onChange={this.handleOldPasswordChange}
              type='password'
              className={this.state.oldPassword ? 'form--field label-move-up' : 'form--field'}
              minLength={minPasswordLength}
              required
            />
            <label htmlFor='oldPassword' className='form--placeholder'>
              Старый пароль
            </label>
          </div>
          <div className='form--box'>
            <input
              id='newPassword'
              value={this.state.newPassword}
              onChange={this.handleNewPasswordChange}
              type='password'
              className={this.state.newPassword ? 'form--field label-move-up' : 'form--field'}
              minLength={minPasswordLength}
              ref={(input) => {
                this.newPassword = input;
              }}
              required
            />
            <label htmlFor='newPassword' className='form--placeholder'>
              Новый пароль
            </label>
          </div>
          <div className='form--box'>
            <input
              id='confirmPassword'
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              type='password'
              className={this.state.confirmPassword ? 'form--field label-move-up' : 'form--field'}
              minLength={minPasswordLength}
              ref={(input) => {
                this.confirmPassword = input;
              }}
              required
            />
            <label htmlFor='confirmPassword' className='form--placeholder'>
              Подтвердите пароль
            </label>
          </div>
          <input
            type='submit'
            className='control-button control-button--blue '
            value={this.props.buttonText}
          />
        </form>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
