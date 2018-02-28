import React from 'react';
import Form from '../Form/Form';
import { addNews } from '../../../newsCalls';
import './AddEditNews.css';

export default () => (
  <div className='admin-form-news'>
    <h1 className='admin-form-news--heading'>Добавление новости</h1>
    <Form onSubmit={addNews} buttonText='Добавить новость' />
  </div>
);
