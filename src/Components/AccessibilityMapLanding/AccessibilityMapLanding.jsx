import React from 'react';
import Card from '../Card/Card';
import { accessibilityMapURL } from '../../configs/config.json';
import accessibilityImage from '../img/pin.svg';
import './AccessibilityMapLending.css';

export default () => (
  <div className='accessibility-map'>
    <Card
      heading='Карта доступности'
      text='Карта доcтупности поможет построить вам наиболее оптимальный и
            удобный вариант передвижения по городу.'
      url={accessibilityMapURL}
      linkText='Посмотреть'
      classNameLink='card--link card--link-purple'
    />
    <img src={accessibilityImage} alt='Карта доступности' className='accessibility-map--image' />
  </div>
);
