import React from 'react';
import Time from '../Time/Time';
import Form from './Form/Form';
import './Admin.css';

export default () => (
  <div className='admin'>
    <div className='form--add-news'>
      <h1 className='form--heading'>Добавление новости</h1>
      <Time />
      <Form />
    </div>
  </div>
);
