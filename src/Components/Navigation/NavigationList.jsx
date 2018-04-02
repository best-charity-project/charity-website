import React from 'react';
import { NavLink } from 'react-router-dom';
import navigationPaths from './NavigationPaths.json';
import './Navigation.css';

const NavigationList = ({ userInfo, onClick }) =>
  navigationPaths.map((item) => {
    if ((!userInfo.admin && item.path === '/admin') ||
      (userInfo.admin && item.path === '/account') ||
      (!userInfo.name && item.path === '/account')) {
      return null;
    }
    return (
      <li key={item.path}>
        <NavLink onClick={onClick} to={item.path} className='navigation--element'>
          {item.name}
        </NavLink>
      </li>
    );
  });

export default NavigationList;
