import React from 'react';
import { getNews } from '../../newsCalls';
import SingleNews from './SingleNews/SingleNews';
import './News.css';
import DetailsButton from '../DetailsButton/DetailsButton';


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
        <h1 className='news--heading'>Новости</h1>
        <div className='news-list'>
          {this.state.news.map(item => (
            <div className='news-list--item' key={item._id}>
              <SingleNews title={item.title} shortDescription={item.shortDescription} />
              <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
