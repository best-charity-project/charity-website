import React from 'react';
import './Time.css';

export default () => {
  const date = new Date();
  return (
    <p className='current-date'>
      Текущая дата:
      <span>{` ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</span>
    </p>
  );
};
