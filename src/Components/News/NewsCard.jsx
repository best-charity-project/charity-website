import React from 'react';
import SingleNews from './SingleNews/SingleNews';
import DetailsButton from '../DetailsButton/DetailsButton';
import './NewsCard.css';

const NewsCard = (item) => {
  let link;
  if (item.url) {
    link = item.url;
  } else {
    link = `/news/${item._id}`;
  }
  return (
    <div className='news-list--item' key={item._id}>
      <SingleNews title={item.title} shortDescription={item.shortDescription} />
      <DetailsButton className='control-button control-button--blue' text='Подробнее' url={link} />
    </div>
  );
};

export default NewsCard;
