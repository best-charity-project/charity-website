import React from 'react';
import { Link } from 'react-router-dom';
import './SingleNews';

class SingleNews extends React.Component {
  render() {
    const { className, title, text } = this.props;
    return (
      <div className={className}>
        <h2 className='single-news--title'>{title}</h2>
        <p className='single-news--text'>{text}</p>
        <Link to='/news/1' style={{ textDecoration: 'none' }}>
          <button className='single-news--button'>Подробнее</button>
        </Link>
      </div>
    );
  }
}

export default SingleNews;
