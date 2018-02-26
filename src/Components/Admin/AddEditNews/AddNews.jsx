import React from 'react';
import Form from '../Form/Form';
import { addNews } from '../../../newsCalls';
import './AddEditNews.css';

export default () => (
  <div className='add-edit-news'>
    <h1 className='add-edit-news--heading'>Добавление новости</h1>
    <Form onSubmit={addNews} buttonText='Добавить новость' />
  </div>
);
