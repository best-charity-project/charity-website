import React from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search/Search';
import LibraryItemsList from './LibraryItemsList/LibraryItemsList';
import CategoriesList from './CategoriesList/CategoriesList';
import AddLibraryItem from './Form/AddLibraryItem';
import LibraryDefault from './LibraryDefault/LibraryDefault';
import RedirectToAuthorization from './RedirectToAuthorization/RedirectToAuthorization';
import './Library.css';

const Library = ({ match, userInfo }) => (
  <div className='library indent'>
    <div className='library--box'>
      <div className='library--sidebar'>
        {userInfo.name && <Link to={`${match.url}/addToLibrary`} className='library--add'>
          Добавить в библиотeку
                          </Link>}
        {!userInfo.name && <Link to={`${match.url}/login`} className='library--add'>
          Добавить в библиотeку
                           </Link>}
        <CategoriesList match={match} />
      </div>
      <div className='library--board'>
        <div className='library--header'>
          <Search match={match} />
        </div>
        <Switch>
          <Route exact path={`${match.url}/`} component={LibraryDefault} />
          <Route path={`${match.url}/search`} component={LibraryItemsList} />
          <Route path={`${match.url}/addToLibrary`} component={AddLibraryItem} />
          <Route path={`${match.url}/:category/:type`} component={LibraryItemsList} />
          <Route path={`${match.url}/login`} component={RedirectToAuthorization} />
          <Redirect to={`${match.url}/`} />
        </Switch>
      </div>
    </div>
  </div>
);

export default withRouter(Library);

Library.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
