import React from 'react';
import { Link } from 'react-router-dom';
import './SingleNews.css';

export default props => (
  <div className={props.className}>
    <h2 className='single-news--title'>{props.title}</h2>
    <p className='single-news--text'>{props.text}</p>
    <Link to='/news/1' className='single-news-link'>
      <button className='single-news--button'>Подробнее</button>
    </Link>
  </div>
);
