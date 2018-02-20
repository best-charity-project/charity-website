import React from 'react';
import axios from 'axios';
import Form from './Form/Form';
import './Admin.css';
import SingleNews from '../News/SingleNews/SingleNews';
import data from '../../Database/News.json';
import ControlButton from '../Controls/ControlButton';
import DetailsButton from '../Controls/DetailsButton';

export default () => {
  function handleNewsSubmit(news) {
    axios.post('https://charity-server.herokuapp.com/api/news', news).catch((err) => {
      throw err;
    });
  }

  return (
    <div className='admin indent'>
      <Form onNewsSubmit={handleNewsSubmit} />
      <div className='news-admin indent'>
        <h2 className='news-admin--news-heading'>Список всех новостей</h2>
        {data.map(item => (
          <div className='news-list' key={item.id}>
            <SingleNews title={item.title} shortDescription={item.shortDescription} />
            <ControlButton text='Редактировать' />
            <ControlButton text='Удалить' />
            <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
          </div>
        ))}
      </div>
    </div>
  );
};
