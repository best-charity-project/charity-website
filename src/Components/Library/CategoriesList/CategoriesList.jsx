import React from 'react';
import Category from '../Category/Category';
import './CategoriesList.css';

// eslint-disable-next-line react/prefer-stateless-function
class CategoriesList extends React.Component {
  render() {
    return (
      <div className='CategoriesList indent'>
        <h1 className='CategoriesList--heading'>Список категорий: </h1>
        <div className='CategoriesList-list'>
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
      </div>
    );
  }
}

export default CategoriesList;
