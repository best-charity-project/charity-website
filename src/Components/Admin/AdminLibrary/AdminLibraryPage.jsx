import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoriesList from '../../Library/CategoriesList/CategoriesList';
import EditLibraryItem from './EditLibraryItem';
import AdminLibraryList from './AdminLibraryList';

const AdminLibraryPage = ({ match }) => (
  <div className='admin--library-items'>
    <Switch>
      <Route exact path={`${match.url}`} component={CategoriesList} />
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
