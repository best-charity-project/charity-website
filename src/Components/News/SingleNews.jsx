import React from 'react';
import { Link } from 'react-router-dom';
import './SingleNews.css';

export default class SingleNews extends React.Component {
  static shortenText(short) {
    let result = short;
    const size = 240;
    if (result.length > size) {
      result = `${result.slice(0, size)} ...`;
    }
    return result;
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={this.props.className}>
        <h2 className='single-news--title'>{this.props.title}</h2>
        <p className='single-news--text'>{SingleNews.shortenText(this.props.shortDescription)}</p>
        <Link to='/news/1' className='single-news-link'>
          <button className='single-news--button'>Подробнее</button>
        </Link>
      </div>
    );
  }
}
