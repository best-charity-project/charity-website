import React from 'react';
import BigImage from '../img/front.jpg';
import EducationRoute from '../EducationRoute/EducationRouteSection/EducationRouteSection';
import { getNews } from '../../newsCalls';
import ThreeNews from './ThreeNews/ThreeNews';
import './Home.css';
import './ThreeNews/ThreeNews.css';

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
    getNews().then(news => this.setState({ news }));
  }

  render() {
    return (
      <div className='home indent'>
        <div className='home--image-wrapper'>
          <img src={BigImage} className='home--image_big' alt='Фоновая картинка' />
          <ThreeNews news={this.state.news} />
        </div>
        <EducationRoute />
      </div>
    );
  }
}

export default Home;
