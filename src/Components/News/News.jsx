import React from 'react';
import SingleNews from './SingleNews';
import data from '../../Database/News.json';
import './News.css';

export default () => (
  <div className='news indent'>
    <h1 className='news--heading'>Новости</h1>
    <div className='news-list'>
      {data.map(item => (
        <SingleNews key={item.id} title={item.title} shortDescription={item.shortDescription} />
      ))}
    </div>
  </div>
);
