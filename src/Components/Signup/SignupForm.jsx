import React from 'react';
import PropTypes from 'prop-types';
import countries from './countries.json';
import './SignupForm.css';

class SignupForm extends React.Component {
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
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReasonForRegistrationChange = this.handleReasonForRegistrationChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleOtherCountryChange = this.handleOtherCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
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

  handleConfirmPasswordChange() {
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setCustomValidity('Пароль не соответствует');
    } else {
      this.confirmPassword.setCustomValidity('');
    }
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

  render() {
    return (
      <div className='signup-form'>
        <p className='form--heading'>Регистрация</p>
        <form name='signupForm' onSubmit={this.handleSubmit}>
          <p className='form--label'>
            <label htmlFor='email'>Email:</label>
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
            placeholder='Введите пароль не менее 6 символов'
            minLength='6'
            ref={(input) => {
              this.password = input;
            }}
            required
          />
          <p className='form--label'>
            <label htmlFor='confirmPassword'>Подтвердите пароль:</label>
          </p>
          <input
            id='confirmPassword'
            // value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
            type='password'
            className='form--input'
            placeholder='Подтвердите пароль'
            ref={(input) => {
              this.confirmPassword = input;
            }}
            required
          />
          <p className='form--label'>
            <label htmlFor='name'>Имя пользователя:</label>
          </p>
          <input
            id='name'
            value={this.state.name}
            onChange={this.handleNameChange}
            type='text'
            className='form--input'
            placeholder='Ваше имя'
            required
          />
          <p className='form--label'>
            <label htmlFor='country'>Страна проживания:</label>
          </p>
          <select
            id='country'
            className='form--input'
            value={this.state.country}
            onChange={this.handleCountryChange}
            required
          >
            <option value=''>---</option>
            {countries.map(country => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
          {this.state.country === countries[countries.length - 1] && (
            <div>
              <p className='form--label'>
                <label htmlFor='otherCountry'>Страна:</label>
              </p>
              <input
                id='otherCountry'
                value={this.state.otherCountry}
                onChange={this.handleOtherCountryChange}
                type='text'
                className='form--input'
                placeholder='Cтрана проживания'
                required
              />
            </div>
          )}
          <p className='form--label'>
            <label htmlFor='city'>Город:</label>
          </p>
          <input
            id='city'
            value={this.state.city}
            onChange={this.handleCityChange}
            type='text'
            className='form--input'
            placeholder='Город проживания'
            required
          />
          <p className='form--comment'>Что Вас привело на сайт:</p>
          <p className='form--radio-input'>
            <input
              id='reason1'
              type='radio'
              className='radio-input'
              value='Профессиональная деятельность'
              checked={this.state.reasonForRegistration === 'Профессиональная деятельность'}
              onChange={this.handleReasonForRegistrationChange}
            />
            <label htmlFor='reason1' className='radio-input--label'>
              Профессиональная деятельность
            </label>
          </p>
          <p className='form--radio-input'>
            <input
              id='reason2'
              type='radio'
              className='radio-input'
              value='Родственные связи/знакомый человека с особыми потребностями'
              checked={
                this.state.reasonForRegistration ===
                'Родственные связи/знакомый человека с особыми потребностями'
              }
              onChange={this.handleReasonForRegistrationChange}
            />
            <label htmlFor='reason2' className='radio-input--label'>
              Родственные связи/знакомый человека с особыми потребностями
            </label>
          </p>
          <p className='form--radio-input'>
            <input
              id='reason3'
              type='radio'
              className='radio-input'
              value='Являюсь человеком с особыми потребностями'
              checked={
                this.state.reasonForRegistration === 'Являюсь человеком с особыми потребностями'
              }
              onChange={this.handleReasonForRegistrationChange}
            />
            <label htmlFor='reason3' className='radio-input--label'>
              Являюсь человеком с особыми потребностями
            </label>
          </p>
          <br />
          <input type='submit' className='control-button control-button--blue' value='Отправить' />
        </form>
      </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
