import React from 'react';
import './Search.css';

export default () => (
  <div className='search'>
    <form role='search'>
      <input
        type='search'
        id='search'
        placeholder='Поиск по категории...'
        className='search--input'
      />
      <button className='search--button'>Поиск</button>
    </form>
  </div>
);
