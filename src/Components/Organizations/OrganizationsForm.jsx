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
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeContacts = this.handleChangeContacts.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(name) {
    this.setState({
      name,
    });
  }

  handleChangeDescription(shortDescription) {
    this.setState({
      shortDescription,
    });
  }

  handleChangeContacts(contacts) {
    this.setState({
      contacts,
    });
  }

  handleChangeUrl(url) {
    this.setState({
      url,
    });
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
        <form name='addOrganization' className='form-box' onSubmit={this.handleSubmit}>
          <InputField
            id='name'
            size='wide'
            type='text'
            labelText='Название организации'
            value={this.state.name}
            onChange={this.handleChangeName}
            required='required'
          />
          <InputField
            id='shortDescription'
            size='wide'
            type='text'
            labelText='Краткая информация о деятельности организации'
            value={this.state.shortDescription}
            onChange={this.handleChangeDescription}
            required='required'
          />
          <InputField
            id='contacts'
            size='wide'
            type='text'
            labelText='Контакты'
            value={this.state.contacts}
            onChange={this.handleChangeContacts}
            required='required'
          />
          <InputField
            id='url'
            size='wide'
            type='text'
            labelText='Адрес сайта'
            value={this.state.url}
            onChange={this.handleChangeUrl}
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
