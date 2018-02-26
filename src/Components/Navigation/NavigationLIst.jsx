import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const navigationElements = [
  {
    name: 'Главная',
    path: '/',
  },
  {
    name: 'Библиотека',
    path: '/Library',
  },
  {
    name: 'Новости',
    path: '/news',
  },
  {
    name: 'О нас',
    path: '/about',
  },
  {
    name: 'Admin',
    path: '/admin',
  },
];

function NavigationList(props) {
  const listItems = navigationElements.map(item => (
    <li key={item.path}>
      <Link onClick={props.onClick} to={item.path} className='navigation--element'>
        {item.name}
      </Link>
    </li>
  ));
  return listItems;
}
export default NavigationList;
