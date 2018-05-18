import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListOfOrganizations from './ListOfOrganizations';
import AddOrganization from './AddOrganization';
import RedirectToAuthorization from '../RedirectToAuthorization/RedirectToAuthorization';

const OrganizationsPage = ({ match, userInfo }) => (
  <div className='organizations indent'>
    <div className='organizations--box'>
      <Switch>
        <Route
          exact
          path={`${match.url}/`}
          render={() => <ListOfOrganizations userInfo={userInfo} match={match} />}
        />
        <Route path={`${match.url}/addOrganization`} component={AddOrganization} />
        <Route path={`${match.url}/login`} component={RedirectToAuthorization} />
      </Switch>
    </div>
  </div>
);

export default withRouter(OrganizationsPage);

OrganizationsPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    admin: PropTypes.bool,
  }).isRequired,
};
