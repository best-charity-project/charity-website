import React from 'react';
import SingleNews from './SingleNews';
import data from '../../Database/News.json';
import './News.css';

export default () => (
  <div className='news-list indent'>
    <h1 className='news-list--heading'>Новости</h1>
    <div className='news-list--text'>
      {data.map(item => (
        <SingleNews
          className='news-list--single-box'
          key={item.id}
          title={item.title}
          text={item.text}
        />
      ))}
    </div>
  </div>
);
