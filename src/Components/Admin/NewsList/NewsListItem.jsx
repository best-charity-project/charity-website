import React from 'react';
import './NewsListItem.css';

class NewsListItem extends React.Component {
  render() {
    return (
      <li className='news-list-item'>
        <p className='news-list-title'>{this.props.title}</p>
        <p className='news-list--shortDescription'>{this.props.shortDescription}</p>
        <button className='news-list--delete-button'>X</button>
      </li>
    );
  }
}

export default NewsListItem;
