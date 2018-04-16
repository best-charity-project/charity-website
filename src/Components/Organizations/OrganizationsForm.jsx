import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputField from '../InputField/InputField';
import BackIcon from '../icons/back.svg';
import './OrganizationsForm.css';

class OrganizationsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shortDescription: '',
      contacts: '',
      url: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(value, event) {
    const fieldData = this.state;
    fieldData[event.target.id] = event.target.value;
    this.setState({ fieldData });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name, shortDescription, contacts, url,
    } = this.state;
    this.props.onSubmit({
      name,
      shortDescription,
      contacts,
      url,
    });
  }

  render() {
    return (
      <div className='organizations'>
        <h2 className='secondary-heading'>Добавление организации</h2>
        <div className='organizations--back-link'>
          <img src={BackIcon} alt='иконка' className='back-icon' />
          <NavLink to='/organizations' className='back-link'>
          Вернуться к списку организаций
          </NavLink>
        </div>
        <form name='addOrganization' className='organizations--form' onSubmit={this.handleSubmit}>
          <InputField
            id='name'
            size='wide'
            type='text'
            labelText='Название организации'
            value={this.state.name}
            onChange={(id, event) => this.handleFieldChange(id, event)}
            required='required'
          />
          <InputField
            id='shortDescription'
            size='wide'
            type='text'
            labelText='Краткая информация о деятельности организации'
            value={this.state.shortDescription}
            onChange={(id, event) => this.handleFieldChange(id, event)}
            required='required'
          />
          <InputField
            id='contacts'
            size='wide'
            type='text'
            labelText='Контакты'
            value={this.state.contacts}
            onChange={(id, event) => this.handleFieldChange(id, event)}
            required='required'
          />
          <InputField
            id='url'
            size='wide'
            type='text'
            labelText='Адрес сайта'
            value={this.state.url}
            onChange={(id, event) => this.handleFieldChange(id, event)}
          />
          <input
            type='submit'
            value='Отправить'
            className='form--button control-button control-button-primary'
          />
        </form>
      </div>
    );
  }
}

export default OrganizationsForm;

OrganizationsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
