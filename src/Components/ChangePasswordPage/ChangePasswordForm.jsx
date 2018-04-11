import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../InputField/InputField';
import ConfirmPassword from '../ConfirmPassword/ConfirmPassword';
import './ChangePasswordForm.css';

export default class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
  }

  handleOldPasswordChange(oldPassword) {
    this.setState({
      oldPassword,
    });
  }

  handleNewPasswordChange(newPassword) {
    this.setState({
      newPassword,
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
          <InputField
            id='oldPassword'
            onChange={this.handleOldPasswordChange}
            labelText='Старый пароль'
            type='password'
            required='required'
          />
          <InputField
            id='newPassword'
            onChange={this.handleNewPasswordChange}
            labelText='Новый пароль'
            type='password'
            required='required'
          />
          <ConfirmPassword
            id='confirmPassword'
            newPassword={this.state.newPassword}
            labelText='Подтвердите пароль'
          />
          <input
            type='submit'
            className='control-button control-button-primary '
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
