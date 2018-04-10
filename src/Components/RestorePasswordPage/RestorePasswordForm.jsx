import React from 'react';
import PropTypes from 'prop-types';
import './RestorePasswordForm.css';

export default class RestorePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    this.props.onSubmit(email);
  }

  render() {
    return (
      <div className='restorePasswordForm form'>
        <h2 className='form--heading'>Введите Ваш email</h2>
        <form name='restorePasswordForm' onSubmit={this.handleSubmit}>
          <div className='restorePasswordForm--box'>
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

RestorePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
