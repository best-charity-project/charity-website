import React from 'react';
import Category from '../Category/Category';
import './CategoriesList.css';

export default () => (
  <ul className='categories-list'>
    <span className='categories-list--heading'>Список категорий: </span>
    <li className='categories-list--element'>
      <Category />
    </li>
  </ul>
);
