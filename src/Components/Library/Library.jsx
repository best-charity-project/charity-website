import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search/Search';
import CategoriesList from './CategoriesList/CategoriesList';
import Form from './Form/Form';
import LibraryItemList from './LibraryItemsList/LibraryItemsList';
import './Library.css';

const Library = ({ match }) => (
  <div className='library indent'>
    <h1 className='library--heading'>Библиотека</h1>
    <Link to={`${match.url}/addToLibrary`} className='library--link'>
      Добавить информацию в библиотеку
    </Link>
    <Link to={`${match.url}/categories`} className='library--link'>
      Категории
    </Link>
    <Search />
    <Switch>
      <Route exact path={`${match.url}/categories`} component={CategoriesList} />
      <Route path={`${match.url}/addToLibrary`} component={Form} />
      <Route
        path={`${match.url}/categories/:category/libraryItems/:type`}
        component={LibraryItemList}
      />
      <Redirect to={`${match.url}/categories`} />
    </Switch>
  </div>
);

export default Library;

Library.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
