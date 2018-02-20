import React from 'react';
import PropTypes from 'prop-types';
import SingleNews from '../News/SingleNews';
import './ThreeNews.css';
import '../News/SingleNews.css';

const ThreeNews = props => (
  <div className='news-box'>
    <h1 className='news-box--heading'>Свежие новости</h1>
    <hr className='heading-underline' />
    <div className='news-box--homepage-news'>
      {props.news
        .slice(0, 3)
        .map(newsItem => (
          <SingleNews
            className='news-box--single-item'
            key={newsItem._id}
            title={newsItem.title}
            shortDescription={newsItem.shortDescription}
          />
        ))}
    </div>
  </div>
);

export default ThreeNews;

ThreeNews.propTypes = {
  news: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.objectOf({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }), PropTypes.object])).isRequired,
};
