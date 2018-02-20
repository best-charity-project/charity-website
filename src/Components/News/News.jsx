import React from 'react';
import SingleNews from './SingleNews/SingleNews';
import data from '../../Database/News.json';
import './News.css';
import DetailsButton from '../Controls/DetailsButton';

export default () => (
  <div className='news indent'>
    <h1 className='news--heading'>Новости</h1>
    <div className='news-list'>
      {data.map(item => (
        <div className='news-list--item' key={item.id}>
          <SingleNews title={item.title} shortDescription={item.shortDescription} />
          <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
        </div>
      ))}
    </div>
  </div>
);
