import React from 'react';
import PropTypes from 'prop-types';
import countries from './countries.json';
import RulesPage from './RulesPage';
import InputField from '../InputField/InputField';
import ConfirmPassword from '../ConfirmPassword/ConfirmPassword';
import './SignupForm.css';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      country: '',
      otherCountry: '',
      city: '',
      reasonForRegistration: '',
      isOpen: false,
      reasons: [
        'Профессиональная деятельность',
        'Родственные связи/знакомый человека с особыми потребностями',
        'Являюсь человеком с особыми потребностями',
      ],
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReasonForRegistrationChange = this.handleReasonForRegistrationChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleOtherCountryChange = this.handleOtherCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.toggleWindow = this.toggleWindow.bind(this);
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

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleCountryChange(e) {
    this.setState({
      country: e.target.value,
    });
  }

  handleOtherCountryChange(e) {
    this.setState({
      otherCountry: e.target.value,
    });
  }

  handleCityChange(e) {
    this.setState({
      city: e.target.value,
    });
  }

  handleReasonForRegistrationChange(e) {
    this.setState({
      reasonForRegistration: e.target.value,
    });
  }

  clearFields() {
    this.setState({
      email: '',
      password: '',
      name: '',
      country: '',
      city: '',
      otherCountry: '',
      reasonForRegistration: '',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { country } = this.state;
    if (this.state.country === countries[countries.length - 1]) {
      country = this.state.otherCountry;
    }
    const {
      email, password, name, city, reasonForRegistration,
    } = this.state;
    this.props.onSubmit({
      email,
      password,
      name,
      country,
      city,
      reasonForRegistration,
    });
    this.clearFields();
  }

  toggleWindow() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className='form'>
        <p className='form--heading'>Регистрация</p>
        <form name='signupForm' onSubmit={this.handleSubmit}>
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
          <div className='form--box'>
            <input
              id='name'
              value={this.state.name}
              onChange={this.handleNameChange}
              type='text'
              className={this.state.name ? 'form--field label-move-up' : 'form--field'}
              required
            />
            <label htmlFor='name' className='form--placeholder'>
              Ваше имя
            </label>
          </div>
          <InputField
            id='password'
            type='password'
            onChange={this.handlePasswordChange}
            labelText='Пароль'
            required='required'
          />
          <ConfirmPassword
            id='confirmPassword'
            newPassword={this.state.password}
            labelText='Подтвердите пароль'
          />
          <div className='form--box'>
            <select
              id='country'
              className='form--field field--select'
              value={this.state.country}
              onChange={this.handleCountryChange}
              required
            >
              <option value='' disabled selected>
                Страна проживания
              </option>
              {countries.map(country => (
                <option value={country} key={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className='form--box'>
            <input
              id='city'
              value={this.state.city}
              onChange={this.handleCityChange}
              type='text'
              className={this.state.city ? 'form--field label-move-up' : 'form--field'}
              required
            />
            <label htmlFor='city' className='form--placeholder'>
              Город проживания
            </label>
          </div>
          {this.state.country === countries[countries.length - 1] && (
            <div className='form--box'>
              <input
                id='otherCountry'
                value={this.state.otherCountry}
                onChange={this.handleOtherCountryChange}
                type='text'
                className={this.state.otherCountry ? 'form--field label-move-up' : 'form--field'}
                required
              />
              <label htmlFor='city' className='form--placeholder'>
                Страна проживания
              </label>
            </div>
          )}
          <p className='form--comment'>Что Вас привело на сайт:</p>
          {this.state.reasons.map((reason, index) => (
            <p key={reason} className='form--radio-input'>
              <input
                id={`reason${index + 1}`}
                name='reason'
                type='radio'
                className='radio-field'
                value={reason}
                checked={this.state.reasonForRegistration === reason}
                onChange={this.handleReasonForRegistrationChange}
                required
              />
              <label htmlFor={`reason${index + 1}`} className='radio-input--label'>
                {reason}
              </label>
            </p>
          ))}
          <br />
          {this.state.isOpen && <RulesPage toggle={this.toggleWindow} />}
          <p className='form--accept-rules-checkbox'>
            <input onChange={this.handleCheckbox} type='checkbox' required />
            <span>Регистрируясь, вы соглашаетесь с </span>
            <a
              className='accept-rules--link'
              onClick={this.toggleWindow}
              onKeyPress={this.toggleWindow}
              role='button'
              tabIndex={0}
            >
              {' '}
              правилами
            </a>
          </p>
          <input
            type='submit'
            className='control-button control-button-primary'
            value='Регистрация'
          />
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
