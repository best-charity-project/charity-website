import React from 'react';
import axios from 'axios';
import Form from './Form/Form';
import './Admin.css';
import SingleNews from '../News/SingleNews/SingleNews';
import data from '../../Database/News.json';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';

export default () => {
  function handleNewsSubmit(news) {
    axios.post('https://charity-server.herokuapp.com/api/news', news).catch((err) => {
      throw err;
    });
  }

  return (
    <div className='admin indent'>
      <Form onNewsSubmit={handleNewsSubmit} />
      <div className='news-admin'>
        <h2 className='news-admin--news-heading'>Список всех новостей</h2>
        <div className='news-list'>
          {data.map(item => (
            <div className='news-list--item' key={item.id}>
              <SingleNews title={item.title} shortDescription={item.shortDescription} />
              <ControlButton text='Редактировать' />
              <ControlButton text='Удалить' />
              <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
