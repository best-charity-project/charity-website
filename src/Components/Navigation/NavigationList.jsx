import React from 'react';
import { NavLink } from 'react-router-dom';
import navigationPaths from './NavigationPaths.json';
import './Navigation.css';

const NavigationList = props =>
  navigationPaths.map((item) => {
    if (!props.userInfo.admin && item.path === '/admin') {
      return null;
    }
    if (props.userInfo.admin && item.path === '/account') {
      return null;
    }
    if (!props.userInfo.name && item.path === '/account') {
      return null;
    }
    return (
      <li key={item.path}>
        <NavLink onClick={props.onClick} to={item.path} className='navigation--element'>
          {item.name}
        </NavLink>
      </li>
    );
  });

export default NavigationList;
