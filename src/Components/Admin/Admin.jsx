import React from 'react';
import { getNews, addNews } from '../../newsCalls';
import Form from './Form/Form';
import './Admin.css';
import AdminNewsItem from './AdminNewsItem';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      newsToUpdate: {
        id: '',
        title: '',
        shortDescription: '',
        url: '',
        date: '',
      },
      showSaveButton: false,
    };
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
    this.handleNewsEdit = this.handleNewsEdit.bind(this);
  }

  componentDidMount() {
    this.setNews();
  }

  setNews() {
    getNews().then(news => this.setState({ news }));
  }
  // eslint-disable-next-line
  handleNewsSubmit(news) {
    addNews(news);
  }

  handleNewsEdit(news) {
    this.setState({ newsToUpdate: news, showSaveButton: true });
  }

  render() {
    return (
      <div className='admin indent'>
        <Form
          onNewsSubmit={this.handleNewsSubmit}
          id={this.state.newsToUpdate.id}
          title={this.state.newsToUpdate.title}
          shortDescription={this.state.newsToUpdate.shortDescription}
          url={this.state.newsToUpdate.url}
          date={this.state.newsToUpdate.date}
          showSaveButton={this.state.showSaveButton}
        />
        <div className='news-admin'>
          <h2 className='news-admin--news-heading'>Список всех новостей</h2>
          <div className='news-list'>
            {this.state.news.map(item => (
              <AdminNewsItem key={item._id} {...item} onNewsUpdate={this.handleNewsEdit} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
