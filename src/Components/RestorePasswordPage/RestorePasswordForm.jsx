import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../InputField/InputField';
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

  handleEmailChange(email) {
    this.setState({
      email,
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
        <form
          name='restorePasswordForm'
          onSubmit={this.handleSubmit}
          className='restorePasswordForm--form'
        >
          <InputField
            id='email'
            type='email'
            value={this.state.email}
            onChange={this.handleEmailChange}
            labelText='e-mail'
            required='required'
          />
          <input
            type='submit'
            className='control-button control-button-primary'
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
