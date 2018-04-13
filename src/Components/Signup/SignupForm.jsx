import React from 'react';
import PropTypes from 'prop-types';
import countries from './countries.json';
import RulesPage from './RulesPage';
import InputField from '../InputField/InputField';
import ConfirmPassword from '../ConfirmPassword/ConfirmPassword';
import RadioInput from '../RadioInput/RadioInput';
import SelectInput from '../SelectInput/SelectInput';
import { minPasswordLength } from '../../configs/config.json';
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
    this.toggleWindow = this.toggleWindow.bind(this);
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

  handleNameChange(name) {
    this.setState({
      name,
    });
  }

  handleCountryChange(country) {
    this.setState({
      country,
    });
  }

  handleOtherCountryChange(otherCountry) {
    this.setState({
      otherCountry,
    });
  }

  handleCityChange(city) {
    this.setState({
      city,
    });
  }

  handleReasonForRegistrationChange(reasonForRegistration) {
    this.setState({
      reasonForRegistration,
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
          <InputField
            id='email'
            type='email'
            value={this.state.email}
            onChange={this.handleEmailChange}
            labelText='e-mail'
            required='required'
          />
          <InputField
            id='name'
            type='text'
            value={this.state.name}
            onChange={this.handleNameChange}
            labelText='Ваше имя'
            required='required'
          />
          <InputField
            id='password'
            type='password'
            value={this.state.password}
            onChange={this.handlePasswordChange}
            labelText='Пароль'
            minLength={minPasswordLength}
            required='required'
          />
          <ConfirmPassword
            id='confirmPassword'
            newPassword={this.state.password}
            labelText='Подтвердите пароль'
          />
          <SelectInput
            id='country'
            value={this.state.country}
            onChange={this.handleCountryChange}
            data={countries}
            labelText=''
            fieldName='Страна проживания'
            required='required'
          />
          <InputField
            id='city'
            type='text'
            value={this.state.city}
            onChange={this.handleCityChange}
            labelText='Город проживания'
            required='required'
          />
          {this.state.country === countries[countries.length - 1] && (
            <InputField
              id='otherCountry'
              type='text'
              value={this.state.otherCountry}
              onChange={this.handleOtherCountryChange}
              labelText='Страна проживания'
              required='required'
            />
          )}
          <p className='form--comment'>Что Вас привело на сайт:</p>
          {this.state.reasons.map((reason, index) => (
            <RadioInput
              key={reason}
              name='reason'
              id={`reason${index + 1}`}
              onChange={this.handleReasonForRegistrationChange}
              labelText={reason}
              checked={this.state.reasonForRegistration === reason}
              required='required'
              reason={reason}
            />
          ))}
          <br />
          {this.state.isOpen && <RulesPage toggle={this.toggleWindow} />}
          <p className='form--accept-rules-checkbox'>
            <input type='checkbox' required />
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
