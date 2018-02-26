import React from 'react';
import { Link } from 'react-router-dom';
import navigationElements from './NavigationPaths.json';
import './Navigation.css';

function NavigationList(props) {
  return navigationElements.map(item => (
    <li key={item.path}>
      <Link onClick={props.onClick} to={item.path} className='navigation--element'>
        {item.name}
      </Link>
    </li>
  ));
}
export default NavigationList;
