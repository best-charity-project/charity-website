import React from 'react';
import SingleNews from '../SingleNews';
import './NewsItem.css';

export default () => (
  <div className='news-item'>
    <SingleNews
      title='Расширяя горизонты задуманного'
      text='Задача организации, в особенности же дальнейшее развитие различных форм деятельности.'
    />
  </div>
);
