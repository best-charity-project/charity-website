import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import OrganizationsForm from './OrganizationsForm';
import { addOrganization } from '../../organizationsCalls';

const AddOrganization = ({ showMessage }) => {
  function handleFormSubmit(formData) {
    addOrganization(formData)
      .then((data) => {
        showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  return (
    <div>
      <OrganizationsForm onSubmit={handleFormSubmit} />
      <p className='add-organization-item-comment'>
        *** Информация отобразится в разделе после одобрения модератором
      </p>
    </div>
  );
};

export default withRouter(AddOrganization);

AddOrganization.propTypes = {
  showMessage: PropTypes.func.isRequired,
};
