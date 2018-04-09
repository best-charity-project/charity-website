import React from 'react';
import SingleNews from './SingleNews/SingleNews';
import DetailsButton from '../DetailsButton/DetailsButton';
import './NewsCard.css';

const NewsCard = (item) => {
  let link;
  let text;
  if (item.url) {
    link = item.url;
    text = 'Перейти';
  } else {
    link = `/news/${item._id}`;
    text = 'Подробнее';
  }
  return (
    <div className='news-card' key={item._id}>
      <SingleNews title={item.title} newsText={item.newsText} />
      <DetailsButton className='control-button control-button-blue' text={text} url={link} />
    </div>
  );
};

export default NewsCard;
