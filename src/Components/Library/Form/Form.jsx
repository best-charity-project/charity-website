import React from 'react';
import './Form.css';

export default () => (
  <div>
    <h2>Добавить информацию</h2>
    <form name='addCategory'>
      <label htmlFor='addCategory'>
        Выбор методики
        <p>
          <select className='form-field'>
            <option>Прикладной анализ поведения</option>
            <option selected>Сенсорная интеграция</option>
            <option>Нейрокоррекция</option>
            <option>Медицина (традиционные и нетрадиционные методы)</option>
            <option>Игротерапия</option>
            <option>Логопедия</option>
            <option>Систерма альтернативной коммуникации(PECS, жесты и т.д)</option>
          </select>
        </p>
      </label>
      <label htmlFor='addCategory'>
        Выбор категории
        <p>
          <select className='form-field'>
            <option selected>Литература</option>
            <option>Видео</option>
            <option>Статьи</option>
            <option>Учебные материалы</option>
          </select>
        </p>
      </label>
      <label htmlFor='addCategory'>
        Название документа
        <p>
          <input type='text' placeholder='Название' className='form-field' />
        </p>
      </label>
      <label htmlFor='addCategory'>
        Краткое описание
        <p>
          <textarea type='text' placeholder='Описание документа' className='form-field' />
        </p>
      </label>
      <label htmlFor='addCategory'>
        Ссылка на источник
        <p>
          <input type='url' placeholder='https://....' className='form-field' />
        </p>
      </label>
      <br />
      <input type='submit' value='Добавить' />
    </form>
  </div>
);
