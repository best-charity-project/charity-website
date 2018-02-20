import React from 'react';
import SingleNews from '../../News/SingleNews/SingleNews';
import data from '../../../Database/News.json';
import './NewsList.css';

export default () => (
  <div className='news-admin indent'>
    <h2 className='news-admin--news-heading'>Список всех новостей</h2>
    {data.map(item => (
      <div className='news-admin--list' key={item.id}>
        <SingleNews
          className='list--news-item'
          title={item.title}
          shortDescription={item.shortDescription}
        />
        <button className='form--button news-admin--button'>Редактировать</button>
        <button className='form--button news-admin--button'>Удалить</button>
      </div>
    ))}
  </div>
);
