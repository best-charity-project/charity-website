import React from 'react';
import BigImage from '../img/front.jpg';
import NewsGetter from '../../newsGetter';
import ThreeNews from '../News/ThreeNews';
import './Home.css';
import '../News/ThreeNews.css';

class Home extends React.Component {
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
    NewsGetter.getNews().then(news => this.setState({ news }));
  }
  render() {
    return (
      <div className='home indent'>
        <div className='home--image-wrapper'>
          <img src={BigImage} className='home--image_big' alt='home_image' />
          <ThreeNews news={this.state.news} />
        </div>
      </div>
    );
  }
}

export default Home;
