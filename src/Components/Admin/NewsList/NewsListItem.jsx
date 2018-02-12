import React from 'react';

export default () => (
  <li className='news-list-item'>
    <p className='news-list-title'>{this.props.title}</p>
    <p className='news-list--shortDescription'>{this.props.shortDescription}</p>
    <button className='news-list--delete-button'>X</button>
  </li>
);
