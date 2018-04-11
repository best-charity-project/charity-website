import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';

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

  handleEmailChange(email) {
    this.setState({
      email,
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
          <InputField
            id='email'
            type='email'
            onChange={this.handleEmailChange}
            labelText='e-mail'
            required='required'
          />
          <InputField
            id='password'
            type='password'
            onChange={this.handlePasswordChange}
            labelText='Пароль'
            required='required'
          />
          <input
            type='submit'
            className='control-button control-button-primary '
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
