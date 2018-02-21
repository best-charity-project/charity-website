import React from 'react';
import Search from './Search/Search';
import CategoriesList from './CategoriesList/CategoriesList';
import './Library.css';

// eslint-disable-next-line react/prefer-stateless-function
class Library extends React.Component {
  render() {
    return (
      <div className='library indent'>
        <h1 className='library-heading'>Библиотека</h1>
        <Search />
        <CategoriesList />
      </div>
    );
  }
}

export default Library;
