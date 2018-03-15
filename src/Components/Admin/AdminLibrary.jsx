import React from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminLibraryList from './AdminLibrary/AdminLibraryList';
import PendingItemsList from './AdminLibrary/PendingItemsList';
import './AdminLibrary.css';

const AdminLibrary = ({ match }) => (
  <div className='library--admin'>
    <NavLink to={`${match.url}/pending`} className='admin--library-link'>
      Заявки на добавление
    </NavLink>
    <NavLink to={`${match.url}/libraryItems`} className='admin--library-link'>
      Документы библиотеки
    </NavLink>
    <Switch>
      <Route path={`${match.url}/pending`} component={PendingItemsList} />
      <Route path={`${match.url}/libraryItems`} component={AdminLibraryList} />
      <Redirect to={`${match.url}/libraryItems`} />
    </Switch>
  </div>
);

export default AdminLibrary;

AdminLibrary.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
