import React from 'react';
import { getNews, addNews, deleteNews } from '../../newsCalls';
import Form from './Form/Form';
import './Admin.css';
import NewsItem from './NewsList/NewsItem';
import DetailsButton from '../DetailsButton/DetailsButton';

class Admin extends React.Component {
  static delete(id) {
    deleteNews(id);
  }
  static handleNewsSubmit(news) {
    addNews(news);
  }
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
      <div className='admin indent'>
        <Form onNewsSubmit={Admin.handleNewsSubmit} />
        <div className='news-admin'>
          <h2 className='news-admin--news-heading'>Список всех новостей</h2>
          <div className='news-list'>
            {this.state.news.map(item => (
              <div className='news-list--single-item' key={item._id}>
                <NewsItem
                  onDelete={Admin.delete}
                  id={item._id}
                  title={item.title}
                  shortDescription={item.shortDescription}
                />
                <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
