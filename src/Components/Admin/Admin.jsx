import React from 'react';
import Form from './Form/Form';
import './Admin.css';
import NewsList from './NewsList/NewsList';

export default () => (
  <div className='admin indent'>
    <Form />
    <NewsList />
  </div>
);
