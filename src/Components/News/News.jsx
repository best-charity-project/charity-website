import React from 'react';
import { getNews } from '../../newsCalls';
import NewsCard from './NewsCard';
import cancelablePromise from '../../utils/cancelablePromise';
import './News.css';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this.setNews();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setNews() {
    this.cancelablePromise = cancelablePromise(getNews());
    this.cancelablePromise.promise.then(news => this.setState({ news })).catch((err) => {
      window.console.log(err);
    });
  }

  render() {
    return (
      <div className='news indent'>
        <h1 className='primary-heading'>Новости</h1>
        <div className='news-list'>{this.state.news.map(item => NewsCard(item))}</div>
      </div>
    );
  }
}
