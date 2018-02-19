import React from 'react';
import PropTypes from 'prop-types';
import './SingleNews.css';
import shortenText from './ShortenText';

const SingleNews = function SingleNews(props) {
  return (
    <div className='single-news'>
      <h2 className='single-news--title'>{props.title}</h2>
      <p className='single-news--text'>{shortenText(props.shortDescription)}</p>
      <a
        href='https://tut.by'
        target='_blank'
        rel='noopener noreferrer'
        className='single-news--link'
      >
        Подробнее
      </a>
    </div>
  );
};

SingleNews.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};

export default SingleNews;
