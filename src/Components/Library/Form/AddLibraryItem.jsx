import React from 'react';
import Form from '../Form/Form';
import { addLibraryItem } from '../../../libraryCalls';
import './AddLibraryItem.css';

export default () => (
  <div>
    <h1 className='secondary-heading'>Добавление информации в библиотеку</h1>
    <Form
      onSubmit={addLibraryItem}
      buttonText='Добавить'
      message='Документ был добавлен в библиотеку'
    />
    <p className='add-library-item-comment'>
      *** Информация отобразиться в библиотеке после одобрения модератором
    </p>
  </div>
);
