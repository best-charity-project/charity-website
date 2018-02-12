import React from 'react';
import BigImage from '../img/front.jpg';
import ThreeNews from '../News/ThreeNews';
import './Home.css';
import '../News/ThreeNews.css';

export default () => (
  <div className='home indent'>
    <div className='home--image-wrapper'>
      <img src={BigImage} className='home--image_big' alt='home_image' />
      <ThreeNews />
    </div>
  </div>
);
