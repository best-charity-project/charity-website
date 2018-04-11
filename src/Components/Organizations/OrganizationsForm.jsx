import React from 'react';
import { addOrganization } from '../../organizationsCalls';
import InputField from '../FormFields/InputField';
import TextareaField from '../FormFields/TextareaField';

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
    addOrganization({
      name,
      shortDescription,
      contacts,
      url,
    });
  }

  render() {
    return (
      <div className='form'>
        <form name='addOrganization' onSubmit={this.handleSubmit}>
          <InputField
            id='name'
            type='text'
            label='Название организации'
            onChange={this.handleChangeName}
            required='required'
          />
          <TextareaField
            id='shortDescription'
            type='text'
            label='Краткая информация о деятельности организации'
            onChange={this.handleChangeDescription}
            required='required'
          />
          <InputField
            id='contacts'
            type='text'
            label='Контакты'
            onChange={this.handleChangeContacts}
            required='required'
          />
          <InputField id='url' type='text' label='Адрес сайта' onChange={this.handleChangeUrl} />
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
