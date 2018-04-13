import React from 'react';
import BigImage from '../img/front.jpg';
import EducationRoute from '../EducationRouteLanding/EducationRouteLanding';
import AccessibilityMap from '../AccessibilityMapLanding/AccessibilityMapLanding';
import { getNews } from '../../newsCalls';
import ThreeNews from './ThreeNews/ThreeNews';
import './Home.css';
import './ThreeNews/ThreeNews.css';

class Home extends React.Component {
  static makeCancelable(promise) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)));
      promise.catch(error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)));
    });

    return {
      promise: wrappedPromise,
      cancel() {
        hasCanceled_ = true;
      },
    };
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
      <div className='home indent'>
        <div className='home--image-wrapper'>
          <img src={BigImage} className='home--image_big' alt='Фоновая картинка' />
          <ThreeNews news={this.state.news} />
        </div>
        <EducationRoute />
        <AccessibilityMap />
      </div>
    );
  }
}

export default Home;
