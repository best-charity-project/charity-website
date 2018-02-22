import React from 'react';
import Category from '../Category/Category';
import './CategoriesList.css';

export default () => (
  <div className='categories-list'>
    <h1 className='categories-list--heading'>Список категорий: </h1>
    <div className='list'>
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
    </div>
  </div>
);
