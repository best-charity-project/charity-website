import React from 'react';
import { Link } from 'react-router-dom';
import './EducationRouteCart.css';

export default () => (
  <div className='education-route--card'>
    <h2 className='card--heading'>Образовательный маршрут</h2>
    <p className='card--text'>Раздел образовательный маршрут предполагает возможность
    объединение родителей для дальнейшего выстраивания образовательного маршрута
    детей с особыми образовательными потребностями.
    </p>
    <Link to='education-route' className='education-route--link'>Перейти</Link>
  </div>
);
