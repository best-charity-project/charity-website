import React from 'react';
import getNews from '../../newsCalls';
import SingleNews from './SingleNews';
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
      <div className='news-list indent'>
        <h1 className='news-list--heading'>Новости</h1>
        <div className='news-list--text'>
          {this.state.news.map(item => (
            <SingleNews
              className='news-list--single-box'
              key={item._id}
              title={item.title}
              shortDescription={item.shortDescription}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default News;
