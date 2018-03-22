import React from 'react';
import Form from '../Form/Form';
import { addLibraryItem } from '../../../libraryCalls';

export default () => (
  <div>
    <h1 className='form-library--heading'>Добавление информации в библиотеку</h1>
    <Form
      onSubmit={addLibraryItem}
      buttonText='Добавить'
      message='Документ был добавлен в библиотеку'
    />
    <p>*** Информация отобразиться в библиотеке после одобрения модератором</p>
  </div>
);
