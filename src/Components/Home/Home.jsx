import React from 'react';
import BigImage from '../img/front.jpg';
import './Home.css';

export default () => (
  <div className='home indent'>
    <div className='home--image-wrapper'>
      <img src={BigImage} className='home--image_big' />
    </div>
  </div>
);
