import React from 'react';
import SingleNews from '../News/SingleNews';
import data from '../../Database/News.json';
import './ThreeNews.css';
import '../News/SingleNews.css';

export default () => (
  <div className='news-box'>
    <h1 className='news-box--heading'>Свежие новости</h1>
    <div className='news-box--homepage-news'>
      {data
        .slice(0, 3)
        .map(item => (
          <SingleNews
            className='news-box--single-item'
            key={item.id}
            title={item.title}
            shortDescription={item.shortDescription}
          />
        ))}
    </div>
  </div>
);
