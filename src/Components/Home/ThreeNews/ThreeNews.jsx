import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from '../../News/NewsCard';
import './ThreeNews.css';

const LatestNews = props => (
  <div className='latest-news'>
    <h1 className='primary-heading'>Свежие новости</h1>
    <hr className='heading-underline' />
    <div className='news-list'>{props.news.slice(0, 3).map(item => NewsCard(item))}</div>
  </div>
);

export default LatestNews;

LatestNews.propTypes = {
  news: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.objectOf({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      newsText: PropTypes.string.isRequired,
    }),
    PropTypes.object,
  ])).isRequired,
};
