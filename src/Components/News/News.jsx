import React from 'react';
import { getNews } from '../../newsCalls';
import NewsCard from './NewsCard';
import './News.css';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this.setNews();
  }

  setNews() {
    getNews().then(news => this.setState({ news }));
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

export default News;
