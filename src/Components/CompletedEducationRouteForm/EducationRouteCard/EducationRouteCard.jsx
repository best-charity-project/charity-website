import React from 'react';
import PropTypes from 'prop-types';
import Select, { Option } from 'rc-select';
import InputMask from 'react-input-mask';
import ControlButton from '../../ControlButton/ControlButton';
import { getLocations, deleteEducation } from '../../../educationCalls';
import Modal from '../../Admin/ModalWindow/ModalWindow';
import Message from '../../Message/Message';
import './EducationRouteCard.css';

export default class EducationRouteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      name: this.props.name,
      phone: this.props.phone,
      email: this.props.email,
      regionIndex: this.props.regionIndex,
      regionDistricts: this.props.regionDistricts,
      city: this.props.city,
      educationalInstitution: this.props.educationalInstitution,
      firstYear: this.props.firstYear,
      lastYear: this.props.lastYear,
      program: this.props.program,
      isOpen: false,
      message: {
        type: '',
        text: '',
      },
      isEdited: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.setLocations = this.setLocations.bind(this);
    this.setName = this.setName.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setRegionDistricts = this.setRegionDistricts.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setProgram = this.setProgram.bind(this);
    this.setFirstYear = this.setFirstYear.bind(this);
    this.setEducationalInstitution = this.setEducationalInstitution.bind(this);
    this.setLastYear = this.setLastYear.bind(this);
  }

  componentDidMount() {
    this.setLocations();
  }

  setFirstYear(event) {
    this.setState({
      firstYear: event.target.value,
    });
  }

  setLastYear(event) {
    this.setState({
      lastYear: event.target.value,
    });
  }

  setEducationalInstitution(event) {
    this.setState({
      educationalInstitution: event.target.value,
    });
  }

  setLocations() {
    getLocations().then((locations) => {
      this.setState({
        locations,
      });
    });
  }

  setRegion(event) {
    this.setState({
      regionIndex: event.target.value,
      regionDistricts: [],
    });
  }

  setRegionDistricts(event) {
    this.setState({
      regionDistricts: event,
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

  setCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  setProgram(event) {
    this.setState({
      program: event.target.value,
    });
  }

  handleEditClick() {
    this.setState({
      isEdited: !this.state.isEdited,
    });
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  deleteItem() {
    deleteEducation(this.props._id)
      .then((data) => {
        this.setState({ message: { type: 'success', text: data.message } });
      })
      .catch((err) => {
        this.setState({ message: { type: 'error', text: err.response.data.message } });
      });
    this.toggleModal();
  }

  render() {
    const districts = (this.state.locations[this.state.regionIndex] || {}).districts || [];
    return (
      <div className='user-cards-wrapper'>
        {!this.state.isEdited && (
          <h2 className='user-cards--title'>Карта № {this.props.index + 1}</h2>
        )}
        {this.state.isEdited && (
          <h2 className='user-cards--title'>Карта № {this.props.index + 1} (РЕДАКТИРОВАНИЕ)</h2>
        )}
        <div className='users-card'>
          {!this.state.isEdited && <p className='users-card--field'>{this.props.name}</p>}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              autoFocus
              select
              value={this.state.name}
              onChange={this.setName}
            />
          )}
          {!this.state.isEdited && <p className='users-card--field'>{this.props.email}</p>}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              value={this.state.email}
              onChange={this.setEmail}
            />
          )}
          {!this.state.isEdited && <p className='users-card--field'>{this.props.phone}</p>}
          {this.state.isEdited && (
            <InputMask
              value={this.state.phone}
              onChange={this.setPhone}
              id='phone'
              placeholder='Введите контактный номер телефона'
              pattern='\+375\([0-9]{2}\)-[0-9]{3}(-[0-9]{2}){2}'
              type='tel'
              mask='+375(99)-999-99-99'
              title='Введите корректный контактный телефон'
              className='form--input users-card--mask'
            />
          )}
          {!this.state.isEdited && <p className='users-card--field'>{this.props.region}</p>}
          {this.state.isEdited && (
            <select
              id='region'
              title='Вы должны выбрать свой регион'
              className='users-card--input-field input-field--select'
              required
              onChange={this.setRegion}
              value={this.state.regionIndex}
            >
              <option disabled>---</option>
              {this.state.locations.map((region, index) => (
                <option key={region.name} value={index}>
                  {region.name}
                </option>
              ))}
            </select>
          )}
          {!this.state.isEdited && (
            <ul className='users-card--field--list'>
              {this.props.regionDistricts.map(regionDistrict => (
                <li key={regionDistrict}>{regionDistrict}</li>
              ))}
            </ul>
          )}
          {this.state.isEdited && (
            <Select
              id='regionDistrictIndices'
              title='Вы должны выбрать областной район'
              choiceTransitionName='rc-select-selection__choice-zoom'
              multiple
              allowClear
              onChange={this.setRegionDistricts}
              notFoundContent='Пожалуйста, выберите регион проживания'
              placeholder='▼'
              value={this.state.regionDistricts}
            >
              {districts.map(district => (
                <Option key={district} title={district}>
                  {district}{' '}
                </Option>
              ))}
            </Select>
          )}
          {!this.state.isEdited && <p className='users-card--field'>{this.props.city}</p>}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              value={this.state.city}
              onChange={this.setCity}
            />
          )}
          {!this.state.isEdited && (
            <p className='users-card--field'>{this.props.educationalInstitution}</p>
          )}
          {this.state.isEdited && (
            <select
              id='region'
              title='Вы должны выбрать свой регион'
              className='users-card--input-field input-field--select'
              required
              onChange={this.setEducationalInstitution}
              value={this.state.educationalInstitution}
            >
              <option>Дошкольное детское учреждение</option>
              <option>Средняя школа</option>
            </select>
          )}
          {!this.state.isEdited && <p className='users-card--field'>{this.props.program}</p>}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              value={this.state.program}
              onChange={this.setProgram}
            />
          )}
          <p className='users-card--field'>
            <span>Начало обучения с </span>
            {!this.state.isEdited && <span className=''>{this.props.firstYear}</span>}
            {this.state.isEdited && (
              <input
                id='first-year'
                value={this.state.firstYear}
                onChange={this.setFirstYear}
                type='number'
                title='дата должна содержать только год и начинаться с 20..'
                placeholder='20__'
                className='form--input label-inline--input users-card--number-field'
                min='2018'
                max='2100'
                required
              />
            )}
            <span>
              ,<br />но не позднее{' '}
            </span>
            {!this.state.isEdited && <span className=''>{this.props.lastYear}</span>}
            {this.state.isEdited && (
              <input
                id='last-year'
                value={this.state.lastYear}
                onChange={this.setLastYear}
                type='number'
                title='дата должна содержать только год и начинаться с 20..'
                placeholder='20__'
                className='form--input label-inline--input users-card--number-field'
                min='2018'
                max='2100'
                required
              />
            )}
          </p>
        </div>
        <div className='card--button-wrapper'>
          {!this.state.isEdited && (
            <ControlButton
              text='Редактировать'
              onButtonClick={this.handleEditClick}
              className='control-button control-button--green control-button--small'
            />
          )}
          {this.state.isEdited && (
            <ControlButton
              text='Сохранить'
              onButtonClick={this.handleEditClick}
              className='control-button control-button--green control-button--small'
            />
          )}
          {!this.state.isEdited && (
            <ControlButton
              text='Удалить'
              onButtonClick={this.toggleModal}
              className='control-button control-button--red control-button--small'
            />
          )}
          {this.state.isEdited && (
            <ControlButton
              text='Отменить'
              onButtonClick={this.handleEditClick}
              className='control-button control-button--red control-button--small'
            />
          )}
          {this.state.isOpen && <Modal onConfirm={this.deleteItem} toggle={this.toggleModal} />}
          <Message {...this.state.message} />
        </div>
      </div>
    );
  }
}

EducationRouteCard.propTypes = {
  _id: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  educationalInstitution: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstYear: PropTypes.number.isRequired,
  lastYear: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  program: PropTypes.string.isRequired,
  regionIndex: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  regionDistricts: PropTypes.arrayOf(PropTypes.string).isRequired,
};
