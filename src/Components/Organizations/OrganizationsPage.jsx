import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListOfOrganizations from './ListOfOrganizations';
import OrganizationsForm from './OrganizationsForm';

const OrganizationsPage = ({ match }) => (
  <div className='organizations indent'>
    <Switch>
      <Route exact path={`${match.url}/`} component={ListOfOrganizations} />
      <Route path={`${match.url}/addOrganization`} component={OrganizationsForm} />
    </Switch>
  </div>
);

export default OrganizationsPage;

OrganizationsPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
