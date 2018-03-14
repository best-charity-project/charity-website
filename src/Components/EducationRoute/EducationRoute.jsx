import React from 'react';
import { getLocations, addEducation } from '../../educationCalls';
import './EducationRoute.css';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      locationsIndex: 0,
      districts: [],
      name: '',
      phone: '',
      email: '',
      region: '',
      regionDistrict: '',
      city: '',
      educationalInstitiution: '',
      year: '',
      programm: '',
    };
    this.eddEducationRoute = this.eddEducationRoute.bind(this);
    this.setName = this.setName.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.setRegionDistrict = this.setRegionDistrict.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setEducationalInstitiution = this.setEducationalInstitiution.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setProgramm = this.setProgramm.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  setCategories() {
    getLocations().then((locations) => {
      this.setState({
        locations,
      });
    });
  }

  setName(element) {
    this.setState({
      name: element.target.value,
    });
  }

  setPhone(element) {
    this.setState({
      phone: element.target.value,
    });
  }

  setEmail(element) {
    this.setState({
      email: element.target.value,
    });
  }

  setRegion(element) {
    this.state.locationsIndex = element.target.value;
    this.setState({
      districts: this.state.locations[this.state.locationsIndex].district,
      region: this.state.locations[this.state.locationsIndex].name,
    });
    if (element.target.value === '6') { this.state.city = 'Минск'; }
  }


  setRegionDistrict(element) {
    this.setState({
      regionDistrict: this.state.districts[element.target.value],
    });
  }

  setCity(element) {
    this.setState({
      city: element.target.value,
    });
  }

  setEducationalInstitiution(element) {
    this.setState({
      educationalInstitiution: element.target.value,
    });
  }

  setYear(element) {
    this.setState({
      year: element.target.value,
    });
  }

  setProgramm(element) {
    this.setState({
      programm: element.target.value,
    });
  }

  eddEducationRoute(event) {
    event.preventDefault();
    const {
      name, phone, email, region, regionDistrict, city, educationalInstitiution, year, programm,
    } = this.state;
    addEducation({
      name,
      phone,
      email,
      region,
      regionDistrict,
      city,
      educationalInstitiution,
      year,
      programm,
    });
  }

  render() {
    return (
      <div className='education-route indent'>
        <h1 className='education-route--heading'>образовательный маршрут</h1>
        <div className='education-route--form'>
          <h2 className='form--title'>
            Анкета
          </h2>
          <p className='form--description'>
            <p>Уважаемые законные представители детей с особыми образовательными потребностями!</p>
            <p>Предлагаем Вам заполнить анкету по определения образовательного маршрута.</p>
            <p>Данная информация Вам поможет найти
              родителей в Республике Беларусь и объединиться.
            </p>
          </p>
          <form className='form' name='addName' onSubmit={this.eddEducationRoute}>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='name'>Имя</label>
              </p>
              <input
                onChange={this.setName}
                id='name'
                type='text'
                maxLength='40'
                placeholder='Имя по которому к Вам можно обратиться'
                className='form--field'
                pattern='^[А-Яа-яЁё\s]+$'
                title='Имя должно содержать только буквы русского алфавита'
                required
              />
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='phone'>Номер телефона</label>
              </p>
              <input
                onChange={this.setPhone}
                id='phone'
                pattern='[^А-Яа-яЁёA-Za-z]+$'
                type='tel'
                title='Введите корректный контактный телефон'
                placeholder='+375-ХХ-ХХХ-ХХ-ХХ'
                className='form--field'
                maxLength='20'
                required
              />
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='email'>Адрес электронной почты</label>
              </p>
              <input
                onChange={this.setEmail}
                maxLength='35'
                id='email'
                type='email'
                title='адрес электронной почты должен иметь формат: имя_почты@email.com'
                placeholder='имя_почты@email.com'
                className='form--field'
                pattern='.+@+*'
                required
              />
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='region'>Регион проживания</label>
              </p>
              <select
                id='region'
                title='Вы должны выбрать свой регион'
                className='form--field'
                required
                onChange={this.setRegion}
              >
                <option value='' disabled selected>
                  ---
                </option>
                {this.state.locations.map((region, index) => (
                  <option key={region.name} value={index}>{region.name}</option>
                ))}
              </select>
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='regionDistrict'>Областной район</label>
              </p>
              <select
                id='regionDistrict'
                title='Вы должны выбрать областной район'
                className='form--field'
                onChange={this.setRegionDistrict}
                required
              >
                <option value='' disabled selected>
                  ---
                </option>
                {this.state.districts.map((districts, index) => (
                  <option key={districts._id} value={index}>{districts}</option>
                ))}
              </select>
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='city'>Город</label>
              </p>
              <input
                id='city'
                onChange={this.setCity}
                type='text'
                maxLength='15'
                value={this.state.city}
                title='Название города должно содержать только буквы русского алфавита'
                placeholder='Ваш город'
                className='form--field'
                pattern='^[А-Яа-яЁё\s]+$'
                required
              />
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='cityDistrict'>Выберите учреждение образования</label>
              </p>
              <select
                id='regionDistrict'
                onChange={this.setEducationalInstitiution}
                title='Вы должны выбрать район города'
                className='form--field'
                required
              >
                <option value='' disabled selected>
                  ---
                </option>
                <option value='Средняя школа'>Средняя школа</option>
                <option value='Дошкольное детское учреждение'>Дошкольное детское учреждение</option>
              </select>
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='year'>В каком году учащийся пойдет в учреждение образования</label>
              </p>
              <input
                id='year'
                onChange={this.setYear}
                type='number'
                title='дата должна содержать только год и начинаться с 20..'
                placeholder='20__'
                className='form--field'
                min='2018'
                max='2100'
                required
              />
              <span className='validity' />
            </div>
            <div className='form--field-wrapper'>
              <p className='form--field-comment'>
                <label htmlFor='name'>Рекомендованная программа образования</label>
              </p>
              <input
                id='name'
                onChange={this.setProgramm}
                type='text'
                maxLength='40'
                placeholder='Программа обучения рекомендованная ЦКРОиР'
                className='form--field'
                pattern='^[А-Яа-яЁё\s]+$'
              />
            </div>
            <div className='form--field-wrapper'>
              <p><span>*</span> - поля, обязательные для заполнения</p>
            </div>
            <input
              type='submit'
              className='control-button control-button--blue'
              value='Отправить'
            />
          </form>
        </div>
      </div>
    );
  }
}
