import React from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminLibraryList from './AdminLibrary/AdminLibraryList';
import PendingItems from './AdminLibrary/PendingItems';
import './AdminLibrary.css';

const AdminLibrary = ({ match }) => (
  <div className='library indent'>
    <NavLink to={`${match.url}/pendingItems`} className='admin-library-link'>
      Pending Items
    </NavLink>
    <NavLink to={`${match.url}/libraryItems`} className='admin-library-link'>
      Все документы библиотеки
    </NavLink>
    <div className='admin-library'>
      <Switch>
        <Route path={`${match.url}/pendingItems`} component={PendingItems} />
        <Route path={`${match.url}/libraryItems`} component={AdminLibraryList} />
        <Redirect to={`${match.url}/libraryItems`} />
      </Switch>
    </div>
  </div>
);

export default AdminLibrary;

AdminLibrary.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
