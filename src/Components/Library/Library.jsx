import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search/Search';
import LibraryItemsList from './LibraryItemsList/LibraryItemsList';
import CategoriesList from './CategoriesList/CategoriesList';
import Form from './Form/Form';
import './Library.css';

const Library = ({ match }) => (
  <div className='library indent'>
    <div className='library--box'>
      <div className='library--sidebar'>
        <Link to={`${match.url}/addToLibrary`} className='library--link'>
          Добавить информацию в библиотеку
        </Link>
        <Link to={`${match.url}/categories`} className='library--link'>
          Категории
        </Link>
      </div>
      <div>
        <h1 className='library--heading'>Библиотека</h1>
        <Search />
        <Switch>
          <Route exact path={`${match.url}/categories`} component={CategoriesList} />
          <Route path={`${match.url}/addToLibrary`} component={Form} />
          <Route
            path={`${match.url}/categories/:category/libraryItems/:type`}
            component={LibraryItemsList}
          />
          <Redirect to={`${match.url}/categories`} />
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
