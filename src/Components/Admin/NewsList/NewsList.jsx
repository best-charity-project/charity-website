import React from 'react';
import getNews from '../../../newsMethods';
import SingleNews from '../../News/SingleNews';
import './NewsList.css';

class NewsList extends React.Component {
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
      <div className='news-admin indent'>
        <h2 className='news-admin--news-heading'>Список всех новостей</h2>
        {this.state.news.map(item => (
          <div className='news-admin--list' key={item._id}>
            <SingleNews
              className='list--news-item'
              title={item.title}
              shortDescription={item.shortDescription}
            />
            <button className='form--button news-admin--button'>Редактировать</button>
            <button className='form--button news-admin--button'>Удалить</button>
          </div>
        ))}
      </div>
    );
  }
}

export default NewsList;
