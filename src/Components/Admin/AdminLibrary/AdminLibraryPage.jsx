import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditLibraryItem from './EditLibraryItem';
import AdminLibraryList from './AdminLibraryList';
import CategoriesListPage from './CategoriesListPage';

const AdminLibraryPage = ({ match }) => (
  <div className='tabs-box'>
    <Switch>
      <Route exact path={`${match.url}`} component={CategoriesListPage} />
      <Route path={`${match.url}/:category/:type/edit/:id`} component={EditLibraryItem} />
      <Route path={`${match.url}/:category/:type`} component={AdminLibraryList} />
    </Switch>
  </div>
);

export default AdminLibraryPage;

AdminLibraryPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
