import React from 'react';
import SingleNews from '../../News/SingleNews/SingleNews';
import data from '../../../Database/News.json';
import './ThreeNews.css';
import DetailsButton from '../../Controls/DetailsButton';

const LatestNews = () => (
  <div className='latest-news'>
    <h1 className='latest-news--heading'>Свежие новости</h1>
    <hr className='heading-underline' />
    <div className='news-list'>
      {data.slice(0, 3).map(item => (
        <div className='news-list--item' key={item.id}>
          <SingleNews title={item.title} shortDescription={item.shortDescription} />
          <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
        </div>
      ))}
    </div>
  </div>
);

export default LatestNews;
