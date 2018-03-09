import React from 'react';
import { Link } from 'react-router-dom';
import educationRoute from './EducationRouteData.json';
import educationImage from '../../img/kids.svg';
import './EducationRouteSection.css';

export default () => educationRoute.map(item => (
  <div className='home--education-route'>
    <div className='education-route--image-wrapper' >
      <img src={educationImage} alt='Образовательный маршрут' className='education-route--image' />
    </div>
    <div className='education-route--card'>
      <h2 className='card--heading'>{item.header}</h2>
      <p className='card--text'>{(item.text)}</p>
      <Link to='education-route' className='education-route--link'>Перейти</Link>
    </div>
  </div>
));
