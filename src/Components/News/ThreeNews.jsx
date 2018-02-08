import React from 'react';
import SingleNews from '../News/SingleNews';
import data from '../../Database/News.json';
import './ThreeNews.css';

export default () => (
  <div className='news-box'>
    <h1 className='news-box--heading'>Latest News</h1>
    <div className='homepage-news'>
      {data
        .slice(0, 3)
        .map(item => (
          <SingleNews
            className='homepage-news--box'
            key={item.id}
            title={item.title}
            text={item.text}
          />
        ))}
    </div>
  </div>
);
