import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
  }

  render() {
    return (
      <div className='form'>
        <form name='loginForm' onSubmit={this.handleSubmit}>
          <p className='form--label'>
            <label htmlFor='email'>Email</label>
          </p>
          <input
            id='email'
            value={this.state.email}
            onChange={this.handleEmailChange}
            type='email'
            className='form--input'
            placeholder='Email'
            required
          />
          <p className='form--label'>
            <label htmlFor='password'>Пароль:</label>
          </p>
          <input
            id='password'
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type='password'
            className='form--input'
            placeholder='Пароль'
            required
          />
          <input
            type='submit'
            className='control-button control-button--blue'
            value={this.props.buttonText}
          />
        </form>
        <p className='form--question'>Не зарегистрированы? </p>
        <Link className='form--link' to='/signup'>
          Регистрация
        </Link>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default LoginForm;
