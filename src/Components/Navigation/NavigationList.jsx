import React from 'react';
import { Link } from 'react-router-dom';
import navigationPaths from './NavigationPaths.json';
import './Navigation.css';

export default props => navigationPaths.map(item => (
  <li key={item.path}>
    <Link onClick={props.onClick} to={item.path} className='navigation--element'>
      {item.name}
    </Link>
  </li>
));
