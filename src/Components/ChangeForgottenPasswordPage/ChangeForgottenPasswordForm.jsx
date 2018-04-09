import React from 'react';
import PropTypes from 'prop-types';
import { minPasswordLength } from '../../configs/config.json';

export default class ChangeForgotenPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      newPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
  }

  handleConfirmPasswordChange() {
    this.setState({ confirmPassword: this.confirmPassword.value });
    if (this.newPassword.value !== this.confirmPassword.value) {
      this.confirmPassword.setCustomValidity('Пароль не соответствует');
    } else {
      this.confirmPassword.setCustomValidity('');
    }
  }

  handleNewPasswordChange(e) {
    this.setState({
      newPassword: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { newPassword } = this.state;
    this.props.onSubmit({ newPassword });
  }

  render() {
    return (
      <div className='changePasswordForm form'>
        <form name='changePasswordForm' onSubmit={this.handleSubmit}>
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
            className='control-button control-button--blue'
            value={this.props.buttonText}
          />
        </form>
      </div>
    );
  }
}

ChangeForgotenPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
