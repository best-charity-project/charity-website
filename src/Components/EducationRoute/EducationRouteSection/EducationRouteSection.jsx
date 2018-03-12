import React from 'react';
import EducationRouteCart from './EducationRouteCart/EducationRouteCart';
import educationImage from '../../img/kids.svg';
import './EducationRouteSection.css';

export default () => (
  <div className='education-route'>
    <div className='education-route--image-wrapper' >
      <img src={educationImage} alt='Образовательный маршрут' className='education-route--image' />
    </div>
    <EducationRouteCart />
  </div>
);
