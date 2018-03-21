import React from 'react';
import PropTypes from 'prop-types';
import './SingleNews.css';
import shortenText from './ShortenText';

const SingleNews = function SingleNews({ title, newsText }) {
  return (
    <div className='single-news'>
      <h2 className='single-news--title'>{title}</h2>
      <p className='single-news--text'>{shortenText(newsText)}</p>
    </div>
  );
};

SingleNews.propTypes = {
  title: PropTypes.string.isRequired,
  newsText: PropTypes.string.isRequired,
};

export default SingleNews;
