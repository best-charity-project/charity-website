import React from 'react';
import axios from 'axios';
import NewsGetter from '../../../newsGetter'; // eslint-disable-line
import NewsItem from './NewsItem';
import './NewsList.css'; // eslint-disable-line

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
    this.deleteNews = this.deleteNews.bind(this);
  }
  componentDidMount() {
    this.setNews();
  }
  setNews() {
    NewsGetter.getNews().then(news => this.setState({ news }));
  }
  // eslint-disable-next-line
  deleteNews(id) {
    axios.delete(`http://charity-server.herokuapp.com/api/news/${id}`).then(response => response);
  }
  render() {
    return (
      <div className='news-admin indent'>
        <h2 className='news-admin--news-heading'>Список всех новостей</h2>
        {this.state.news.map(item => (
          <div className='news-admin--list' key={item._id}>
            <NewsItem
              onDelete={this.deleteNews}
              id={item._id}
              className='list--news-item'
              title={item.title}
              shortDescription={item.shortDescription}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default NewsList;
