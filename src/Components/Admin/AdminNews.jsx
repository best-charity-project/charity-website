import React from 'react';
import AdminNewsItem from './AdminNewsItem';
import { getNews } from '../../newsCalls';

export default class AdminNews extends React.Component {
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
      <div>
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
