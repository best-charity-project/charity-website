import React from 'react';
import PropTypes from 'prop-types';
import Select, { Option } from 'rc-select';
import InputMask from 'react-input-mask';
import ControlButton from '../../ControlButton/ControlButton';
import { getLocations, deleteEducation, updateEducation } from '../../../educationCalls';
import Modal from '../../Admin/ModalWindow/ModalWindow';
import Message from '../../Message/Message';
import InvalidInputMessage from '../../EducationRoute/InvalidInputMessage/InvalidInputMessage';
import './EducationRouteCard.css';

export default class EducationRouteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: {
        type: '',
        text: '',
      },
      isInvalidMessageOpen: false,
      isEdited: false,
      educationToEdit: {
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
        region: this.props.region,
      },
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
    this.handleNewsUpdate = this.handleNewsUpdate.bind(this);
    this.toggleMessageOpening = this.toggleMessageOpening.bind(this);
    this.isRegionDistricts = this.isRegionDistricts.bind(this);
  }

  componentDidMount() {
    this.setLocations();
  }

  setFirstYear(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        firstYear: event.target.value,
      },
    });
  }

  setLastYear(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        lastYear: event.target.value,
      },
    });
  }

  setEducationalInstitution(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        educationalInstitution: event.target.value,
      },
    });
  }

  setLocations() {
    getLocations().then((locations) => {
      this.setState({
        educationToEdit: {
          ...this.state.educationToEdit,
          locations,
        },
      });
    });
  }

  setRegion(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        regionIndex: event.target.value,
        regionDistricts: [],
      },
    });
  }

  setRegionDistricts(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        regionDistricts: event,
        region: this.state.educationToEdit.locations[this.state.educationToEdit.regionIndex].name,
      },
    });
  }

  setName(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        name: event.target.value,
      },
    });
  }

  setPhone(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        phone: event.target.value,
      },
    });
  }

  setEmail(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        email: event.target.value,
      },
    });
  }

  setCity(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        city: event.target.value,
      },
    });
  }

  setProgram(event) {
    this.setState({
      educationToEdit: {
        ...this.state.educationToEdit,
        program: event.target.value,
      },
    });
  }

  handleNewsUpdate(event) {
    event.preventDefault();
    if (this.state.educationToEdit.regionDistricts.length === 0) {
      this.isRegionDistricts();
    } else {
      this.handleEditClick();
      // this.setState({ isEdited: false });
      updateEducation(this.props._id, this.state.educationToEdit);
    }
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

  isRegionDistricts() {
    if (
      this.state.educationToEdit.regionDistricts.length === 0 &&
      this.state.educationToEdit.name !== '' &&
      this.state.educationToEdit.email !== '' &&
      this.state.educationToEdit.regionIndex !== 0
    ) {
      this.toggleMessageOpening();
    }
  }

  toggleMessageOpening() {
    this.setState({
      isInvalidMessageOpen: !this.state.isInvalidMessageOpen,
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
    const districts =
      (this.state.educationToEdit.locations[this.state.educationToEdit.regionIndex] || {})
        .districts || [];
    return (
      <form className='user-cards-wrapper' onSubmit={this.handleNewsUpdate}>
        {!this.state.isEdited && <h2 className='user-cards--title'>Карта № {this.props.index}</h2>}
        {this.state.isEdited && (
          <h2 className='user-cards--title'>Карта № {this.props.index} (РЕДАКТИРОВАНИЕ)</h2>
        )}
        <div className='users-card'>
          {!this.state.isEdited && (
            <p className='users-card--field'>{this.state.educationToEdit.name}</p>
          )}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              autoFocus
              required
              value={this.state.educationToEdit.name}
              onChange={this.setName}
            />
          )}
          {!this.state.isEdited && (
            <p className='users-card--field'>{this.state.educationToEdit.email}</p>
          )}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              value={this.state.educationToEdit.email}
              onChange={this.setEmail}
              required
            />
          )}
          {!this.state.isEdited &&
            this.state.educationToEdit.phone && (
              <p className='users-card--field'>{this.state.educationToEdit.phone}</p>
            )}
          {this.state.isEdited && (
            <InputMask
              value={this.state.educationToEdit.phone}
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
          {!this.state.isEdited && (
            <p className='users-card--field'>{this.state.educationToEdit.region}</p>
          )}
          {this.state.isEdited && (
            <select
              id='region'
              title='Вы должны выбрать свой регион'
              className='users-card--input-field input-field--select'
              required
              onChange={this.setRegion}
              value={this.state.educationToEdit.regionIndex}
            >
              <option disabled>---</option>
              {this.state.educationToEdit.locations.map((region, index) => (
                <option key={region.name} value={index}>
                  {region.name}
                </option>
              ))}
            </select>
          )}
          {!this.state.isEdited && (
            <ul className='users-card--field-list'>
              {this.state.educationToEdit.regionDistricts.map(regionDistrict => (
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
              value={this.state.educationToEdit.regionDistricts}
            >
              {districts.map(district => (
                <Option key={district} title={district}>
                  {district}
                </Option>
              ))}
            </Select>
          )}
          {this.state.isInvalidMessageOpen && (
            <InvalidInputMessage message='Пожалуйста, выберите регион проживания' />
          )}
          {!this.state.isEdited && (
            <p className='users-card--field'>{this.state.educationToEdit.city}</p>
          )}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              value={this.state.educationToEdit.city}
              onChange={this.setCity}
            />
          )}
          {!this.state.isEdited && (
            <p className='users-card--field'>{this.state.educationToEdit.educationalInstitution}</p>
          )}
          {this.state.isEdited && (
            <select
              id='region'
              title='Вы должны выбрать свой регион'
              className='users-card--input-field input-field--select'
              required
              onChange={this.setEducationalInstitution}
              value={this.state.educationToEdit.educationalInstitution}
            >
              <option>Дошкольное детское учреждение</option>
              <option>Средняя школа</option>
            </select>
          )}
          {!this.state.isEdited &&
            this.state.educationToEdit.program && (
              <p className='users-card--field'>{this.state.educationToEdit.program}</p>
            )}
          {this.state.isEdited && (
            <input
              className='users-card--input-field'
              value={this.state.educationToEdit.program}
              onChange={this.setProgram}
            />
          )}
          <p className='users-card--field'>
            <span>Начало обучения с </span>
            {!this.state.isEdited && (
              <span className=''>{this.state.educationToEdit.firstYear}</span>
            )}
            {this.state.isEdited && (
              <input
                id='first-year'
                value={this.state.educationToEdit.firstYear}
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
            {!this.state.isEdited && (
              <span className=''>{this.state.educationToEdit.lastYear}</span>
            )}
            {this.state.isEdited && (
              <input
                id='last-year'
                value={this.state.educationToEdit.lastYear}
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
            <input
              type='button'
              value='Редактировать'
              onClick={this.handleEditClick}
              className='control-button control-button--green control-button--small'
            />
          )}
          {this.state.isEdited && (
            <ControlButton
              text='Сохранить'
              className='control-button control-button--green control-button--small'
            />
          )}
          {!this.state.isEdited && (
            <input
              type='button'
              value='Удалить'
              onClick={this.toggleModal}
              className='control-button control-button--red control-button--small'
            />
          )}
          {this.state.isEdited && (
            <input
              type='button'
              value='Отменить'
              onClick={this.handleEditClick}
              className='control-button control-button--red control-button--small'
            />
          )}
          {this.state.isOpen && <Modal onConfirm={this.deleteItem} toggle={this.toggleModal} />}
          <Message {...this.state.message} />
        </div>
      </form>
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
