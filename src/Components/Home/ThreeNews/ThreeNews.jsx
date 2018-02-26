import React from 'react';
import PropTypes from 'prop-types';
import SingleNews from '../../News/SingleNews/SingleNews';
import './ThreeNews.css';
import DetailsButton from '../../DetailsButton/DetailsButton';

const LatestNews = props => (
  <div className='latest-news'>
    <h1 className='latest-news--heading'>Свежие новости</h1>
    <hr className='heading-underline' />
    <div className='news-list'>
      {props.news.slice(0, 3).map(item => (
        <div className='news-list--item' key={item._id}>
          <SingleNews title={item.title} shortDescription={item.shortDescription} />
          <DetailsButton
            className='control-button control-button--blue'
            text='Подробнее'
            url={item.url}
          />
        </div>
      ))}
    </div>
  </div>
);

export default LatestNews;

LatestNews.propTypes = {
  news: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.objectOf({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shortDescription: PropTypes.string.isRequired,
    }),
    PropTypes.object,
  ])).isRequired,
};
