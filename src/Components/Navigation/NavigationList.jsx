import React from 'react';
import { NavLink } from 'react-router-dom';
import navigationPaths from './NavigationPaths.json';
import './Navigation.css';

const NavigationList = ({ onClick }) =>
  navigationPaths.map(item => (
    <li className='menu--element' key={item.path}>
      <NavLink onClick={onClick} to={item.path} className='element--navigation'>
        {item.name}
      </NavLink>
    </li>
  ));

export default NavigationList;
