import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
        <CategoriesList />
      </div>
      <div className='library--board'>
        <div className='library--header'>
          <Search />
          <Link to={`${match.url}/addToLibrary`} className='library--add'>
            Добавить
          </Link>
        </div>
        <Switch>
          <Route path={`${match.url}/addToLibrary`} component={Form} />
          <Route path={`${match.url}/:category/:type`} component={LibraryItemsList} />
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
