import React from 'react';
import Form from '../Form/Form';
import { addNews } from '../../../newsCalls';
import './AddEditNews.css';

export default () => (
  <div>
    <h1 className='addEditNews--heading'>Добавление новости</h1>
    <Form onSubmit={addNews} buttonText='Добавить новость' />
  </div>
);
