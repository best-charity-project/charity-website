import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search/Search';
import LibraryItemsList from './LibraryItemsList/LibraryItemsList';
import CategoriesList from './CategoriesList/CategoriesList';
import LibrarySearchList from './LibrarySearchList/LibrarySearchList';
import AddLibraryItem from './Form/AddLibraryItem';
import LibraryDefault from './LibraryDefault/LibraryDefault';
import './Library.css';

const Library = ({ match }) => (
  <div className='library indent'>
    <div className='library--box'>
      <div className='library--sidebar'>
        <Link to={`${match.url}/addToLibrary`} className='library--add'>
          Добавить в библиотeку
        </Link>
        <CategoriesList match={match} />
      </div>
      <div className='library--board'>
        <div className='library--header'>
          <Search match={match} />
        </div>
        <Switch>
          <Route exact path={`${match.url}/`} component={LibraryDefault} />
          <Route path={`${match.url}/search`} component={LibrarySearchList} />
          <Route path={`${match.url}/addToLibrary`} component={AddLibraryItem} />
          <Route path={`${match.url}/:category/:type`} component={LibraryItemsList} />
          <Redirect to={`${match.url}/`} />
        </Switch>
      </div>
    </div>
  </div>
);

export default Library;

Library.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
