import React from 'react';

export default () => {
  const date = new Date();
  return (
    <p className='form--current-date'>
      Текущая дата:
      <span>{` ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</span>
    </p>
  );
};
