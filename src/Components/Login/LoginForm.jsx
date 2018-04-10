import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PasswordInput from '../PasswordInput/PasswordInput';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isVisible: true,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswordChange(password) {
    this.setState({
      password,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
  }

  render() {
    return (
      <div className='form'>
        <h2 className='form--heading'>Вход в систему</h2>
        <form name='loginForm' onSubmit={this.handleSubmit}>
          <div className='form--box'>
            <input
              id='email'
              value={this.state.email}
              onChange={this.handleEmailChange}
              type='email'
              className={this.state.email ? 'form--field label-move-up' : 'form--field'}
              required
            />
            <label htmlFor='email' className='form--placeholder'>
              e-mail
            </label>
          </div>
          <PasswordInput id='password' onChange={this.handlePasswordChange} labelText='Пароль' />
          <input
            type='submit'
            className='control-button control-button--blue'
            value={this.props.buttonText}
          />
        </form>
        <div className='form--question'>
          <p className='question--text'>Не зарегистрированы? </p>
          <Link to='/signup'>Регистрация</Link>
        </div>
        <div className='form--question-right'>
          <Link to='/restore-password'>Забыли пароль?</Link>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default LoginForm;
