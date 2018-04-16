import React from 'react';
import OrganizationsForm from './OrganizationsForm';
import { addOrganization } from '../../organizationsCalls';
import Message from '../Message/Message';

class AddOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        text: '',
      },
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formData) {
    addOrganization(formData)
      .then((data) => {
        this.setState({ message: { type: 'success', text: data.message } });
      })
      .catch((err) => {
        this.setState({ message: { type: 'error', text: err.response.data.message } });
      });
  }

  render() {
    return (
      <div>
        <Message {...this.state.message} />
        <OrganizationsForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default AddOrganization;
