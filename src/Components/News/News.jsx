import React from 'react';
import { getNews } from '../../newsCalls';
import SingleNews from './SingleNews/SingleNews';
import DetailsButton from '../DetailsButton/DetailsButton';
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
        <h1 className='news--heading'>Новости</h1>
        <div className='news-list'>
          {this.state.news.map((item) => {
            let link;
            if (item.url) {
              link = item.url;
            } else {
              link = `/news/${item._id}`;
            }
            return (
              <div className='news-list--item' key={item._id}>
                <SingleNews title={item.title} shortDescription={item.shortDescription} />
                <DetailsButton
                  className='control-button control-button--blue'
                  text='Подробнее'
                  url={link}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
