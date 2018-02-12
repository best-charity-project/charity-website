import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SingleNews.css';

const SingleNews = function SingleNews(props) {
  return (
    <div className={props.className}>
      <h2 className='single-news--title'>{props.title}</h2>
      <p className='single-news--text'>{props.shortDescription}</p>
      <Link to='/news/1' className='single-news-link'>
        <button className='single-news--button'>Подробнее</button>
      </Link>
    </div>
  );
};

SingleNews.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SingleNews;
