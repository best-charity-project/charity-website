import React from 'react';
import SingleNews from '../News/SingleNews';
import data from '../../Database/News.json';
import './ThreeNews.css';
import '../News/SingleNews.css';

export default () => (
  <div className='latest-news'>
    <h1 className='latest-news--heading'>Свежие новости</h1>
    <hr className='heading-underline' />
    <div className='latest-news--news'>
      {data
        .slice(0, 3)
        .map(item => (
          <SingleNews key={item.id} title={item.title} shortDescription={item.shortDescription} />
        ))}
    </div>
  </div>
);
