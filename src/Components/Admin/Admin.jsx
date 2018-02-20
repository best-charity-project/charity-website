import React from 'react';
import axios from 'axios';
import Form from './Form/Form';
import './Admin.css';
// import NewsList from './NewsList/NewsList';
import SingleNews from '../News/SingleNews';
import data from '../../Database/News.json';

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
            <button className='form--button news-admin--button'>Редактировать</button>
            <button className='form--button news-admin--button'>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};
