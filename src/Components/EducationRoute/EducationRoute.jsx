import React from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import { getLocations, addEducation } from '../../educationCalls';
import './EducationRoute.css';
import './SelectStyles.css';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      name: '',
      phone: '',
      email: '',
      region: '',
      regionDistrict: '',
      city: '',
      educationalInstitution: '',
      year: '',
      program: '',
      children: [],
    };
    this.addEducationRoute = this.addEducationRoute.bind(this);
    this.setName = this.setName.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.setRegionDistrict = this.setRegionDistrict.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setEducationalInstitution = this.setEducationalInstitution.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setProgram = this.setProgram.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  setCategories() {
    getLocations().then((locations) => {
      this.setState({ locations });
    });
  }

  setName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  setPhone(event) {
    this.setState({
      phone: event.target.value,
    });
  }

  setEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  setRegion(event) {
    event.persist();
    this.setState({
      region: this.state.locations[0].name,
    }, () => {
      if (!(event.target.value === '')) {
        this.state.locations[event.target.value]
          .district.map(district =>
            this.state.children
              .push(<Option key={district} title={district}>{district} </Option>));
      }
    });

    if (event.target.value === '6') {
      this.setState({ city: 'Минск' });
    } else {
      this.setState({ city: '' });
    }
  }

  setRegionDistrict(event) {
    this.setState({
      regionDistrict: event,
    });
  }

  setCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  setEducationalInstitution(event) {
    this.setState({
      educationalInstitution: event.target.value,
    });
  }

  setYear(event) {
    this.setState({
      year: event.target.value,
    });
  }

  setProgram(event) {
    this.setState({
      program: event.target.value,
    });
  }

  addEducationRoute(event) {
    event.preventDefault();
    if (this.state.regionDistrict.length === 0) {
      console.log('NIT');
    } else {
      const {
        name, phone, email, region, regionDistrict, city, educationalInstitution, year, program,
      } = this.state;
      addEducation({
        name,
        phone,
        email,
        region,
        regionDistrict,
        city,
        educationalInstitution,
        year,
        program,
      });
      this.setState({
        name: '',
        phone: '',
        email: '',
        region: '',
        regionDistrict: '',
        city: '',
        educationalInstitution: '',
        year: '',
        program: '',
      });
    }
  }

  render() {
    const dropdownMenuStyle = {
      maxHeight: 200,
    };
    const dropdownStyle = {
      borderRadius: '0',
    };
    return (
      <div className='education-route indent'>
        <h1 className='education-route--heading'>образовательный маршрут</h1>
        <div className='education-route--education-form' >
          <h2 className='education-form--title'>
            Анкета
          </h2>
          <div className='education-form--description'>
            <p>Уважаемые законные представители детей с
              особыми образовательными потребностями!
            </p>
            <p>Предлагаем Вам заполнить анкету по
              определения образовательного маршрута.
            </p>
            <p>Данная информация поможет Вам найти
              родителей в Республике Беларусь и объединиться.
            </p>
          </div>
          <form className='education-form' name='addName' onSubmit={this.addEducationRoute}>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                <label htmlFor='name'>Имя</label>
              </p>
              <input
                value={this.state.name}
                onChange={this.setName}
                id='name'
                type='text'
                maxLength='40'
                placeholder='Имя по которому к Вам можно обратиться'
                className='education-form--field'
                pattern='^[А-Яа-яЁё\s]+$'
                title='Имя должно содержать только буквы русского алфавита'
                required
              />
              <span className='validity' />
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                <label htmlFor='phone'>Номер телефона</label>
              </p>
              <input
                value={this.state.phone}
                onChange={this.setPhone}
                id='phone'
                pattern='[^А-Яа-яЁёA-Za-z]+$'
                type='tel'
                title='Введите корректный контактный телефон'
                placeholder='+375-ХХ-ХХХ-ХХ-ХХ'
                className='education-form--field'
                maxLength='20'
                required
              />
              <span className='validity' />
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                <label htmlFor='email'>Адрес электронной почты</label>
              </p>
              <input
                value={this.state.email}
                onChange={this.setEmail}
                maxLength='35'
                id='email'
                type='email'
                title='адрес электронной почты должен иметь формат: имя_почты@email.com'
                placeholder='имя_почты@email.com'
                className='education-form--field'
                pattern='.+@+*'
                required
              />
              <span className='validity' />
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                <label htmlFor='region'>Регион проживания</label>
              </p>
              <select
                id='region'
                title='Вы должны выбрать свой регион'
                className='education-form--select education-form--field'
                required
                onChange={this.setRegion}
              >
                <option value=''>
                  ---
                </option>
                {this.state.locations.map((region, index) => (
                  <option key={region.name} value={index}>{region.name}</option>
                ))}
              </select>
              <span className='validity' />
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                <label htmlFor='regionDistrict'>Областной район</label>
              </p>
              <Select
                id='regionDistrict'
                title='Вы должны выбрать областной район'
                choiceTransitionName='rc-select-selection__choice-zoom'
                dropdownMenuStyle={dropdownMenuStyle}
                multiple
                allowClear
                onChange={this.setRegionDistrict}
                dropdownStyle={dropdownStyle}
                notFoundContent='Пожалуйста, выберите регион проживания'
                placeholder='▼'
              >
                {this.state.children}
              </Select>
              <span className='validity' />
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
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
                className='education-form--field'
                pattern='^[А-Яа-яЁё\s]+$'
                required
              />
              <span className='validity' />
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                Выберите учреждение образования
              </p>
              <div className='education-form--radio-wrapper'>
                <label className='education-form--radio-description' htmlFor='kindergarten'>
                  <input
                    type='radio'
                    id='kindergarten'
                    className='education-form--radio'
                    name='setEducationalInstitution'
                    value='Дошкольное детское учреждение'
                    onChange={this.setEducationalInstitution}
                    required
                  />
                  Дошкольное детское учреждение
                </label>
                <label className='education-form--radio-description' htmlFor='school'>
                  <input
                    type='radio'
                    className='education-form--radio'
                    id='school'
                    onChange={this.setEducationalInstitution}
                    name='setEducationalInstitution'
                    value='Средняя школа'
                  />
                  Средняя школа
                  <span className='validity' />
                </label>
              </div>
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                <label htmlFor='year'>В каком году учащийся пойдет в учреждение образования</label>
              </p>
              <input
                id='year'
                value={this.state.year}
                onChange={this.setYear}
                type='number'
                title='дата должна содержать только год и начинаться с 20..'
                placeholder='20__'
                className='education-form--field'
                min='2018'
                max='2100'
                required
              />
              <span className='validity' />
            </div>
            <div className='education-form--field-wrapper'>
              <p className='education-form--field-comment'>
                <label htmlFor='program'>Рекомендованная программа образования</label>
              </p>
              <input
                id='program'
                value={this.state.program}
                onChange={this.setProgram}
                type='text'
                maxLength='80'
                placeholder='Программа обучения рекомендованная ЦКРОиР'
                className='education-form--field'
              />
            </div>
            <div className='education-form--field-wrapper'>
              <p>
                <span className='field-wrapper--condition'>
                  *
                </span>
                - поля, обязательные для заполнения
              </p>
            </div>
            <input
              type='submit'
              className='education-form--submit'
              value='Отправить'
            />
          </form>
        </div>
      </div>
    );
  }
}
