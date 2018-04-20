import React from 'react';
import BigImage from '../img/front.jpg';
import EducationRoute from '../EducationRouteLanding/EducationRouteLanding';
import LegalInfo from '../LegalInfo/LegalInfo';
import AccessibilityMap from '../AccessibilityMapLanding/AccessibilityMapLanding';
import CalendarLanding from '../CalendarLanding/CalendarLanding';
import { getNews } from '../../newsCalls';
import ThreeNews from './ThreeNews/ThreeNews';
import cancelablePromise from '../../utils/cancelablePromise';
import './Home.css';
import './ThreeNews/ThreeNews.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this.setNews();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setNews() {
    this.cancelablePromise = cancelablePromise(getNews());
    this.cancelablePromise.promise.then(news => this.setState({ news })).catch((err) => {
      window.console.log(err);
    });
  }

  render() {
    return (
      <div className='home indent'>
        <div className='home--image-wrapper'>
          <img src={BigImage} className='home--image_big' alt='Фоновая картинка' />
          <ThreeNews news={this.state.news} />
        </div>
        <CalendarLanding />
        <EducationRoute />
        <AccessibilityMap />
        <LegalInfo />
      </div>
    );
  }
}
