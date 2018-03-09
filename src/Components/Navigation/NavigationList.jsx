import React from 'react';
import { NavLink } from 'react-router-dom';
import navigationPaths from './NavigationPaths.json';
import './Navigation.css';

export default props => navigationPaths.map(item => (
  <li key={item.path}>
    <NavLink onClick={props.onClick} to={item.path} className='navigation--element'>
      {item.name}
    </NavLink >
  </li>
));
