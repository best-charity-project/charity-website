import React from 'react';
import EducationRouteCart from '../EducationRouteCard/EducationRouteCard';
import educationImage from '../img/kids.svg';
import './EducationRouteLanding.css';

export default () => (
  <div className='education-route'>
    <img src={educationImage} alt='Образовательный маршрут' className='education-route--image' />
    <EducationRouteCart />
  </div>
);
